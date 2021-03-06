package com.cwt.game;

import java.util.ArrayList;
import org.newdawn.slick.Image;
import com.cwt.game.tools.ByteMap;
import com.jslix.image.ImgLibrary;

/**
 * ObjectLibrary.java
 *
 * This class is meant to simplify the need for PixAnimate. It uses
 * images within the program to organize a library of object images
 * to use.
 *
 * @author Carr, Crecen
 * @license Look into "LICENSE" file for further information
 * @version 12.11.12
 */

public class ObjectLibrary {

	/** The default base size for all tiles */
    public static final int BASE = 32;
    
    /** Holds map storage data */
    private static ObjectSorter objStore = new ObjectSorter();
    /** This holds scaled images */
    private static ImgLibrary storedImg = new ImgLibrary();
    /** This converts image data to byte data */
    private static ByteMap converter = new ByteMap();
    /** This holds all the byte data conversion for images */
    private static ArrayList<Integer> imgList = new ArrayList<Integer>();
    /** Holds the scale factor of the images */
    private static double scale = 1.0;
    
    /**
     * This function initializes the game elements including the music
     * and the map objects
     * @param isApplet Stores whether this screen is a frame or applet
     */
    public static void initialize(boolean isApplet){ 	
        objStore.setApplet(isApplet);        
        objStore.decode();
    }
    
    /**
     * This function gets the best terrain index for an object available
     * @param tag The 4-letter tag describing the object
     * @return The index where this image object is located
     */
    public static int getTerrainIndex(String tag){
    	objStore.changeName(tag);
    	objStore.changeBase(tag);
    	return objStore.getBestIndex(objStore.TERRAIN);
    }
    
    /**
     * This function gets the best terrain index for an object available. It allows
     * better access for the connection code to change base images.
     * @param index The index where the image is located
     * @param connection The 8- way (N-S-W-E-NW-NE-SW-SE) connection value
     * @return The index where this image object is located
     */
    public static int getTerrainConnection(int index, String connection){
    	objStore.changeConnection(connection);
    	return getTerrainIndex(getName(index));
    }
    
    /**
     * This clears all the image index tag values to the default
     */
    public static void clear(){
    	objStore.reset();
    }
    
    /**
     * This function gets an image from the MapElement list of images using
     * the parameters specified
     * @param index The index location of the image
     * @param player The player color of this image object
     * @param direction The facing direction of this image object
     * @return An Java representation of the image
     */
    public static java.awt.Image getImage(int index,
            int player, int direction){
        storeImage(index, player, direction);
        return storedImg.getImage(imgList.indexOf(converter.getCompact()));
    }

    /**
     * This function gets an image from the MapElement list of images using
     * the parameters specified
     * @param index The index location of the image
     * @param player The player color of this image object
     * @param direction The facing direction of this image object
     * @return A Slick representation of the image
     */
    public static Image getSlickImage(int index, int player, int direction){
        storeImage(index, player, direction);
        return storedImg.getSlickImage(
                imgList.indexOf(converter.getCompact()));
    }
    
    /**
     * This function sets the scale factor for the drawn objects
     * @param tileSize The pixel length of one side of a tile
     */
    public static void setScale(int tileSize){
        scale = tileSize/BASE;
    }

    /**
     * This function gives you the relative scale factor of currently
     * drawn tiles from the base size
     * @return The current scale factor of currently drawn tiles
     */
    public static double getScale(){
        return scale;
    }
    
    /**
	 * This function gets a name from an image index
	 * @param index The image index for this ObjectSorter
	 * @return The String representation for the image name
	 */
    private static String getName(int index){
    	return objStore.getImageName(index);
    }
    
    /**
     * This function stores a scaled image in the image library
     * @param index The index of the image in the MapElement storage
     * @param player The player color of this object
     * @param direction The direction this object is facing
     */
    private static void storeImage(int index, int player, int direction){
        converter.clear();
        converter.addShort(0, index);
        converter.addByte(2, player);
        converter.addByte(3, direction);
        
        //If it exists, don't make new image
        if(imgList.contains(converter.getCompact()))  
        	return;
        
        //Gets the image
        ImgLibrary parseImg = new ImgLibrary();
        parseImg.addImage(objStore.getFile(index));
        int sizey = parseImg.getY(0);
        int sizex = sizey/2;
        
        
        //Scales the image
        storedImg.setImageSize((int)(sizex*((BASE*2)/(double)sizey)*scale),
            (int)(sizey*((BASE*2)/(double)sizey)*scale));
        
        //Stores the image
        imgList.add(converter.getCompact());
        storedImg.addImage(parseImg.getImage(0, 0, 0, sizex, sizey));
        System.out.println("("+storedImg.getX(0)+","+
                storedImg.getY(0)+")");
    }
    
}
