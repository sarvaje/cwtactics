package com.jslix;

import com.jslix.debug.NotifyLibrary;
import com.jslix.io.KeyPress;
import com.jslix.state.Screen;

import java.applet.Applet;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.event.MouseWheelEvent;
import java.awt.event.MouseWheelListener;
import java.awt.image.BufferedImage;

/**
 * SlixApplet.java
 * 
 * This is used to make a general java applet for the JSlix Screens
 *
 * @author Carr, Crecen
 * @license Look into "LICENSE" file for further information
 * @version 12.17.11
 */

public class SlixApplet extends Applet implements Runnable, KeyListener,
        MouseListener, MouseMotionListener, MouseWheelListener{

    private static final long serialVersionUID = 2452945053572843636L;
    //F8 to toggle the log messages visibility
    private final int LOG_KEY = 119;
    //F9 to toggle the frameRate visibility
    private final int FPS_KEY = 120;
    private Thread looper;//The thread associated with running this applet
    private int id;//Holds the keyboard and mouse id options
    private SlixGame game;//Holds the game of the CanvasGameContainer
    private boolean showRate;//Controls whether the frame rate is shown
    private boolean showLog;//Controls whether the log messages are shown
    private Screen tempScreen;//Holds a temporary screen
    private int scrStart;//Holds a variable so only the top screen displays
    /**
     *The image used for Graphics (BackgroundImage)
     */
    private BufferedImage bimg;

    /**
     * This class controls the creation and visuals of a Java2D Applet
     */
    public SlixApplet(){        
        game = new SlixGame();
        game.startTimer(false);
    }

    /**
     * This changes the BasicGame associated with a Slick2D and Java2D game
     * @param newGame The new Slick game to associate with the applet
     */
    public final void changeGame(SlixGame newGame){
        if(newGame != null){
            game = newGame;
            game.startTimer(false);
        }
    }

    /**
     * This changes the visibility of the FPS in the game window
     */
    public void toggleFPS(){
        showRate = !showRate;
    }

    /**
     * This changes the visibility of the log messages in the game window
     */
    public void toggleLog(){
        showLog = !showLog;
        if(showLog) NotifyLibrary.addMessage();
    }

    /**
     * This initializes the JSlix Applet basic functions
     */
    @Override
    public void init(){
        KeyPress.setConv(false);        
        showRate = false;
        showLog = false;
        addKeyListener(this);
        addMouseListener(this);
        addMouseMotionListener(this);
        addMouseWheelListener(this);
        setBackground(Color.BLACK);
        SlixLibrary.updateScreens();
    }

    /**
     * This function starts the thread for the basic window
     */
    @Override
    public void start() {
        looper = new Thread(this);
        looper.start();
    }

    /**
     * This function stops a thread when the window isn't visible
     */
    @Override
    public void stop() {
        looper = null;
    }

    /**
     * This function updates all the graphics of an applet
     * @param g The Java2D graphics object
     */
    @Override
    public void update(Graphics g){ 
        paint(g);
    }

    /**
     * This function uses update to update graphics in the applet
     * @param g The Java2D graphics object
     */
    @Override
    public void paint(Graphics g){
        createGraphics(g, getSize().width, getSize().height);
        //Draws a non-flickering image
        g.drawImage(bimg, 0, 0, this);
    }

    /**
     * This the the JSlix handler for all the graphics of each screen
     * @param g The Java2D graphic handler
     * @param w The current width of the applet window
     * @param h The current height of the applet window
     */
    private void createGraphics(Graphics g, int w, int h){
        if (bimg == null || bimg.getWidth() != w || bimg.getHeight() != h)
            bimg = (BufferedImage) createImage(w, h);

        g = bimg.createGraphics();
        g.setColor(Color.BLACK);
        g.fillRect(0, 0, w, h);

        drawJava(g, w, h);
        showLog(g, w, h);
        showRate(g);
    }

    /**
     * This class handles the graphics of each screen for JSlix
     * @param g The Java2D graphic handler
     * @param w The current width of the applet window
     * @param h The current height of the applet window
     */
    private void drawJava(Graphics g, int w, int h){
        SlixLibrary.updateScreens();

        //Quits game when there are no more screens
        if(SlixLibrary.size() == 0)
            System.exit(0);

        for(int i = 0; i < SlixLibrary.size(); i++){
            scrStart = i;
            tempScreen = SlixLibrary.scrOrder.get(i);

            if(!tempScreen.scr_link)
                break;
        }

        for(int i = scrStart; i >= 0; i--){
            tempScreen = SlixLibrary.scrOrder.get(i);
            tempScreen.scr_mouseScroll = KeyPress.mouseScroll;
            tempScreen.scr_index = i;
            tempScreen.scr_width = w;
            tempScreen.scr_height = h;
            tempScreen.scr_sysTime = game.getTime();
            if(i == 0)
                tempScreen.update(-100);
            tempScreen.render((Graphics2D)g, this);
            tempScreen.scr_mouseScroll = 0;
        }
    }

    /**
     * This function handles various keyboard actions and stores them to
     * values for Java2D (expandable)
     * @param e The key event to handle
     */
    private void handleKeyboard(KeyEvent e){
        id = e.getID();
        switch(id){
            case KeyEvent.KEY_PRESSED:
                //System.out.println("Key Code:" + keycode);
                //System.out.println("Key Location:" + keylocation);
                KeyPress.addKeyPress(e.getKeyCode(), false);
                if(e.getKeyCode() == LOG_KEY)
                    toggleLog();
                if(e.getKeyCode() == FPS_KEY)
                    toggleFPS();
                break;
            case KeyEvent.KEY_RELEASED:
                //System.out.println("RKey Code:" + e.getKeyCode());
                //System.out.println("RKey Location:" + e.getKeyLocation());
                KeyPress.removeKeyPress(e.getKeyCode());
                break;
        }
    }

    /**
     * This function handles various mouse actions and stores them to
     * actions for Java2D(expandable)
     * @param e The mouse action to handle
     * @param wheelScroll The mouse scroll wheel value
     */
    private void handleMouse(MouseEvent e, int wheelScroll){
        id = e.getID();
        KeyPress.mouseScroll = wheelScroll;
        switch(id){
            case MouseEvent.MOUSE_PRESSED:
                //System.out.println("Mouse Button:" + mousebutton);
                //System.out.println("X Mouse:" + (mouseX*scalex));
                //System.out.println("Y Mouse:" + (mouseY*scaley));
                //System.out.println("Mouse Clicked:" + mouseclick);
                KeyPress.addMouseClick(e.getButton(), false);
                break;
            case MouseEvent.MOUSE_RELEASED:
                KeyPress.removeMouseClick(e.getButton());
                break;
            case MouseEvent.MOUSE_MOVED:
            case MouseEvent.MOUSE_DRAGGED:
                KeyPress.mouseX = e.getX();
                KeyPress.mouseY = e.getY();
                break;
        }
    }

    /**
     * This function sets the frame rate for the Java2D game
     */
    public void setFrameRate(){
        game.setFrameRate();
    }

    /**
     * This function shows the frame rate graphics
     * @param g The Java2D graphics object
     */
    private void showRate(Graphics g){
        if(showRate){
            g.setColor(Color.WHITE);
            g.drawString("FPS: "+game.getFPS(), 0, getSize().height);
        }
    }

    /**
     * This function shows log messages in the JSlix window
     * @param g The Java2D graphics object
     * @param w The current width of the window
     * @param h The current height of the window
     */
    private void showLog(Graphics g, int w, int h){
        if(showLog){
            NotifyLibrary.update(w, h, game.getTime());
            NotifyLibrary.render((Graphics2D)g, this);
        }
    }

    /**
     * This is the runnable for JSlix
     */
    //@Override
    public void run() {
        Thread me = Thread.currentThread();
        while (looper == me) {
            try {
                Thread.sleep(game.getFrameTime());
            } catch (InterruptedException e) {
                System.err.println(e.getMessage());
            }
            setFrameRate();
            repaint();
        }
    }

    //@Override
    public void keyTyped(KeyEvent e) {
        handleKeyboard(e);
    }
    //@Override
    public void keyPressed(KeyEvent e) {
        handleKeyboard(e);
    }
    //@Override
    public void keyReleased(KeyEvent e) {
        handleKeyboard(e);
    }
    //@Override
    public void mouseClicked(MouseEvent e) {
        handleMouse(e, 0);
    }
    //@Override
    public void mousePressed(MouseEvent e) {
        handleMouse(e, 0);
    }
    //@Override
    public void mouseReleased(MouseEvent e) {
        handleMouse(e, 0);
    }
    //@Override
    public void mouseEntered(MouseEvent e) {
        handleMouse(e, 0);
    }
    //@Override
    public void mouseExited(MouseEvent e) {
        handleMouse(e, 0);
    }
    //@Override
    public void mouseDragged(MouseEvent e) {
        handleMouse(e, 0);
    }
    //@Override
    public void mouseMoved(MouseEvent e) {
        handleMouse(e, 0);
    }
    //@Override
    public void mouseWheelMoved(MouseWheelEvent e) {
        handleMouse(e, e.getWheelRotation());
    }
}
