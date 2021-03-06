package com.cwt.menu.tools;

import com.jslix.image.ImgLibrary;
import com.jslix.state.ScreenSkeleton;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Component;
import java.awt.Graphics2D;
import java.awt.Image;
import org.newdawn.slick.Graphics;

/**
 * MovingImage.java
 * 
 * A simple remix of MovingPix, it moves images around the Canvas in a
 * smooth motion.
 *
 * @author Carr, Crecen
 * @license Look into "LICENSE" file for further information
 * @version 02.27.11
 */

public class MovingImage implements ScreenSkeleton{

    /** Controls the scale width of an Image */
    protected double scalex;
    /** Controls the scale height of an Image */
    protected double scaley;
    /** The original width of the screen */
    protected int origx;
    /** The original height of the screen */
    protected int origy;
    /** The current scale width of an Image */
    private int cursx;
    /** The current scale height of an Image */
    private int cursy;

    /** The current x-axis position of an image */
    protected double posx;
    /** The current y-axis position of an image */
    protected double posy;
    /** Where this image will move to in x-axis */
    public double fposx;
    /** Where this image will move to in y-axis */
    public double fposy;
    /** How quickly the object will move in pixels */
    protected double speed;
    /** How far off the shade is from the image */
    protected int shadeOff;
    /** What color to put in the shadow of the image */
    protected Color shadow;
    /** How much color you can see through an image */
    protected double opacity;

    /** The stored displayed Images */
    protected ImgLibrary imgRef;
    /** This controls if image resizing is active */
    protected boolean active;
    /** A list of default colors */
    protected Color[] dfltColor;
    /** A list of recolors */
    protected Color[] chngColor;
    /** Stores the intended width for this image */
    private double fsizex;
    /** Stores the intended height for this image */
    private double fsizey;

    /**
     * This class creates a moving logo picture that appears to move around
     * the screen
     * @param locx The x-axis position of this object
     * @param locy The y-axis position of this object
     * @param speed How fast this object moves in the screen
     */
    public MovingImage(int locx, int locy, double speed){
        posx = locx;
        fposx = locx;
        posy = locy;
        fposy = locy;
        fsizex = 0;
        fsizey = 0;
        this.speed = speed;
        shadeOff = 0;
        imgRef = new ImgLibrary();
        opacity = 1.0;
        scalex = 1;
        scaley = 1;
        origx = -1;
        origy = -1;
        active = true;
    }

    /**
     * This function changes image colors when displayed to the window
     * @param fromColor The default color RGB to change
     * @param toColor The color to change the default RGB to
     */
    public void addColor(Color fromColor, Color toColor){
        if(fromColor != null && toColor != null){
            dfltColor = addColor(dfltColor, fromColor);
            chngColor = addColor(chngColor, toColor);
            cursx = 0;
        }
    }

    /**
     * This function removes all color changing variables from the list
     */
    public void resetColor(){
        dfltColor = null;
        chngColor = null;
        cursx = 0;
    }

    /**
     * This function is used to stretch images to the window size
     * @param scrX The width of the window
     * @param scrY The height of the window
     */
    public void setOrigScreen(int scrX, int scrY){
        origx = scrX;
        origy = scrY;
    }

    /**
     * This function sets an opacity for this image
     * @param opacity How opaque this image is from 0-1
     */
    public void setOpacity(double opacity){
        if(opacity >= 0 && opacity <= 1)
            this.opacity = opacity;
    }

    /**
     * Sets an image to display based on a path from a file
     * @param imgPath The path to the image
     */
    public void setImage(String imgPath){
        setImage(imgPath, 0, 0);
    }

    /**
     * Sets an image to display based on another image
     * @param img The java Image to display
     */
    public void setImage(Image img){
        setImage(img, 0, 0);
    }

    /**
     * Sets an image to display based on a path from a file
     * @param imgPath The path to the image
     * @param sizex the resize width of the image
     * @param sizey the resize height of the image
     */
    public void setImage(String imgPath, int sizex, int sizey){
        if(active)
            imgRef.addImage(0, imgPath);
        else
            imgRef.addImage(imgPath);
        fsizex = (sizex > 0) ? sizex: imgRef.getX(0);
        fsizey = (sizey > 0) ? sizey: imgRef.getY(0);
        cursx = 0;
    }

    /**
     * Sets an image to display based on another image
     * @param img The java Image to display
     * @param sizex the resize width of the image
     * @param sizey the resize height of the image
     */
    public void setImage(Image img, int sizex, int sizey){
        if(active)
            imgRef.addImage(0, img);
        else
            imgRef.addImage(img);
        fsizex = (sizex > 0) ? sizex: imgRef.getX(0);
        fsizey = (sizey > 0) ? sizey: imgRef.getY(0);
        cursx = 0;
    }

    /**
     * Sets a shadow casted underneath the image
     * @param offset How far the shadow is from the image
     */
    public void setShadowOffset(int offset){
        shadeOff = offset;
    }

    /**
     * Sets the blending color for the shadow
     * @param theColor The color of the shadow blend
     */
    public void setShadowColor(Color theColor){
        if(theColor != null)
            shadow = theColor;
    }

    /**
     * This sets a new position for the image without altering the final
     * position
     * @param x The x-axis location
     * @param y The y-axis location
     */
    public void setPosition(int x, int y){
        posx = x;
        posy = y;
    }

    /**
     * This sets a new position for the image that it will move to
     * @param x The x-axis location
     * @param y The y-axis location
     */
    public void setFinalPosition(int x, int y){
        fposx = x;
        fposy = y;
    }

    /**
     * This sets the image movement speed for the image
     * @param thisSpeed The movement speed for the image
     */
    public void setSpeed(double thisSpeed){
        speed = (thisSpeed < 0) ? -thisSpeed : thisSpeed;
    }

    /**
     * This function updates the visuals of the moving image
     * @param width The current width of the screen
     * @param height The current height of the screen
     * @param sysTime The system time in milliseconds
     * @param mouseScroll The mouse scroll wheel value
     */
    //@Override
    public void update(int width, int height, int sysTime, int mouseScroll) {
        updatePosition();
        if(cursx != width || cursy != height){
            cursx = width;
            cursy = height;
            if(origx <= 0)  origx = width;
            if(origy <= 0)  origy = height;
            scalex = (double)cursx/origx;
            scaley = (double)cursy/origy;
            if(active){
                if(dfltColor != null){
                    for(int i = 0; i < dfltColor.length; i++)
                        imgRef.setPixelChange(dfltColor[i], chngColor[i]);
                }
                imgRef.setImageSize((int)(fsizex*scalex),
                    (int)(fsizey*scaley));
                imgRef.addImage(1, imgRef.getImage(0));
                if(shadow != null){
                    imgRef.setPixelBlend(shadow);
                    imgRef.addImage(2, imgRef.getImage(1));
                }
            }
        }
    }

    /**
     * This function draws a moving image to the screen
     * @param g The Slick graphics object
     */
    //@Override
    public void render(Graphics g) {
        if(imgRef.length() > 1){
            if(shadeOff != 0 && shadow != null){
                if(opacity < 1){
                    imgRef.getSlickImage(1).setAlpha((float)opacity);
                    imgRef.getSlickImage(2).setAlpha((float)opacity);
                }
                g.drawImage(imgRef.getSlickImage(2),
                    (int)((posx+shadeOff)*scalex),
                    (int)((posy+shadeOff)*scaley));
            }
            g.drawImage(imgRef.getSlickImage((shadeOff == 0 && shadow != null)
                    ? 2 : 1), (int)(posx*scalex), (int)(posy*scaley));
        }
    }

    /**
     * This function draws a moving image to the screen
     * @param g The Java2D graphics object
     * @param dthis The Java2D Component object
     */
    //@Override
    public void render(Graphics2D g, Component dthis){
        if(imgRef.length() > 1){
            if(opacity < 1)
                g.setComposite(AlphaComposite.getInstance(
                        AlphaComposite.SRC_OVER, (float)opacity));
            if(shadeOff != 0 && shadow != null)
                g.drawImage(imgRef.getImage(2), 
                        (int)((posx+shadeOff)*scalex),
                        (int)((posy+shadeOff)*scaley), dthis);
            g.drawImage(imgRef.getImage((shadeOff == 0 && shadow != null)
                    ? 2 : 1), (int)(posx*scalex), (int)(posy*scaley), dthis);
            if(opacity < 1)
                g.setComposite(AlphaComposite.SrcOver);
        }
    }

    /**
     * This controls the movement of the images
     */
    private void updatePosition(){
        if(posx != fposx || posy != fposy){
            if(speed == 0){
                posx = fposx;
                posy = fposy;
            }
            if(posx != fposx)
                posx += (posx < fposx) ? speed : -speed;
            if(posy != fposy)
                posy += (posy < fposy) ? speed : -speed;
        }
    }

    /**
     * This function adds a color to the color array used for repainting
     * images
     * @param colorArray The current color array
     * @param theColor The color to be added
     * @return The color appended onto the array
     */
    private Color[] addColor(Color[] colorArray, Color theColor){
        if(colorArray == null)
            colorArray = new Color[0];

        Color[] temp = colorArray;
        colorArray = new Color[temp.length+1];
        System.arraycopy(temp, 0, colorArray, 0, temp.length);
        colorArray[colorArray.length-1] = theColor;

        return colorArray;
    }

    //@Override
    public void init() {}

    //@Override
    public void update(String name, int index, boolean isApplet,
            boolean seethru) {}

    //@Override
    public void update(int timePassed) {}
}
