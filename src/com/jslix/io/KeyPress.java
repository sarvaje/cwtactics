package com.jslix.io;

import com.jslix.SlixConv;

import java.util.HashMap;
import java.util.Scanner;

/**
 * A simple remix of UserAction. Instead of storing keyboard and mouse
 * actions, this class will help translate Slick key presses into Java
 * key presses and vice-versa for the keyboard and the mouse. Useful since
 * Slick mentions all keys in terms of numbers, but Java has the String
 * values for each key
 *
 * @author Carr, Crecen
 * @license Look into "LICENSE" file for further information
 * @version 04.04.11
 */

public class KeyPress {

    //This converts keys
    private static HashMap<Integer, Integer> keyMap = null;
    //This converts mouse clicks
    private static HashMap<Integer, Integer> mouseMap = null;
    //This checks the current list of variables stored in the HashMap
    private static boolean isSlick = false;

    //Holds a list of stored actions
    private static HashMap<KeyIndex, Integer> conveyor = null;
    //Holds a temporary stored key or mouse press
    private static KeyIndex temp = new KeyIndex();
    //Holds the value of the last key pressed;
    private static int lastKey = -1;
    //Holds the value of the last mouse action pressed
    private static int lastMouse = -1;

    //Holds whether the last action done was a mouse action
    public static boolean mouseFocus;
    //Holds the current horizontal location of the mouse
    public static int mouseX;
    //Holds the current vertical location of the mouse
    public static int mouseY;
    //Holds the current scroll value of the mouse;
    public static int mouseScroll;
   
    /**
     * Gets the current value of the horizontal axis of the mouse
     * @return The horizontal axis of the mouse
     */
    public static int getMouseX(){
        return mouseX;
    }

    /**
     * Gets the current value of the vertical axis of the mouse
     * @return The vertical axis of the mouse
     */
    public static int getMouseY(){
        return mouseY;
    }

    /**
     * Gets whether the last user action was a mouse action
     * @return Whether the last action by the user was a mouse action
     */
    public static boolean mouseFocused(){
        return mouseFocus;
    }

    /**
     * Gets the scroll wheel value of the mouse
     * @return The direction of the scroll click
     */
    public static int getMouseScroll(){
        return mouseScroll;
    }
    
    /**
     * This sets the scroll wheel to steady
     */
    public static void resetMouseWheel(){
    	mouseScroll = 0;
    }
    /**
     * Whether user is actively pressing a control
     * @return Whether a user is causing input
     */
    public static boolean userActive(){
        return !conveyor.isEmpty();
    }

    /**
     * Based solely on the commands, tells you whether the screen
     * displayed is a Slick Screen or not
     * @return True if it is a Slick Window
     */
    public static boolean isSlickWindow(){
        return isSlick;
    }

    /**
     * Holds the last Key action registered by the user
     * @return The last key registered
     */
    public static int lastKeyAction(){
        return lastKey;
    }

    /**
     * Holds the last mouse action registered by the user
     * @return The last mouse click registered
     */
    public static int lastMouseAction(){
        return lastMouse;
    }

    /**
     * Tests to see if a key is held down
     * @param keycode The key to test
     * @return if key is held down
     */
    public static boolean isKeyDown(int keycode){
        temp.code = keycode;
        temp.index = 0;

        if(conveyor == null)    clearAll();
        return conveyor.containsKey(temp) && keycode == lastKey;
    }

    /**
     * Tests to see if a mouse button is held down
     * @param mousebutton The mouse click to test
     * @return if button is held down
     */
    public static boolean isMouseDown(int mousebutton){
        temp.code = mousebutton;
        temp.index = 1;

        if(conveyor == null)    clearAll();
        return conveyor.containsKey(temp) && mousebutton == lastMouse;
    }

    /**
     * Tests to see if a key was pressed
     * @param keycode The key to test
     * @return if key was pressed
     */
    public static boolean isKeyPressed(int keycode){
        if(isKeyDown(keycode)){
            if(conveyor.get(temp) == 1){
                conveyor.put(temp, 0);
                return true;
            }
        }
        return false;
    }

    /**
     * Checks to see if a mouse button was pressed
     * @param mousebutton The mouse button to check
     * @return if it was clicked
     */
    public static boolean isMouseClicked(int mousebutton){
        if(isMouseDown(mousebutton)){
            if(conveyor.get(temp) == 1){
                conveyor.put(temp, 0);
                return true;
            }
        }
        return false;
    }

    /**
     * Depending on the frame displayed (user screen), it'll either generate
     * a Slick key code from a Java key code is a Java window is displayed; or
     * a Java key code from a Slick key code if a Slick window is displayed.
     * @param keycode The current screen key code
     * @return The converted code
     */
    public static int getKeyConversion(int keycode){
        if(keyMap == null)
            setConv(isSlick);
        if(keyMap.containsKey(keycode))
            return keyMap.get(keycode);
        return -1;
    }

    /**
     * Depending on the frame displayed (user screen), it'll either generate
     * a Slick mouse click from a Java click is a Java window is displayed; or
     * a Java mouse click from a Slick click if a Slick window is displayed.
     * @param mousebutton The current screen click
     * @return The converted button
     */
    public static int getMouseConversion(int mousebutton){
        if(mouseMap == null)
            setConv(isSlick);
        if(mouseMap.containsKey(mousebutton))
            return mouseMap.get(mousebutton);
        return -1;
    }


    /**
     * Conserves memory by clearing all references from the list
     */
    public static void clearAll(){
        if(keyMap != null)     keyMap.clear();
        else                   keyMap = new HashMap<Integer, Integer>();
        if(mouseMap != null)   mouseMap.clear();
        else                   mouseMap = new HashMap<Integer, Integer>();
        if(conveyor != null)   conveyor.clear();
        else                   conveyor = new HashMap<KeyIndex, Integer>();
    }

    /**
     * Adds a user key action to the array
     * @param keycode The action to add
     * @param slick Whether it is a Slick action
     */
    public static void addKeyPress(int keycode, boolean slick){
        isSlick = slick;
        temp.code = keycode;
        temp.index = 0;
        lastKey = keycode;
        mouseFocus = false;
        alterKeyPress(temp, true);
    }

    /**
     * Adds a user mouse action to the array
     * @param mousebutton The mouse action to add
     * @param slick Whether it is a Slick action
     */
    public static void addMouseClick(int mousebutton, boolean slick){
        isSlick = slick;
        temp.code = mousebutton;
        temp.index = 1;
        lastMouse = mousebutton;
        mouseFocus = true;
        alterKeyPress(temp, true);
    }

    /**
     * Removes a key press from the list of key presses
     * @param keycode The key to remove
     */
    public static void removeKeyPress(int keycode){
        temp.code = keycode;
        temp.index = 0;
        lastKey = -1;
        alterKeyPress(temp, false);
    }

    /**
     * Removes mouse clicks from the array
     * @param mousebutton The button to remove
     */
    public static void removeMouseClick(int mousebutton){
        temp.code = mousebutton;
        temp.index = 1;
        lastMouse = -1;
        alterKeyPress(temp, false);
    }

    /**
     *
     * Gets information from a file for all key presses and mouse conversions
     * @param slickConv Whether you want the Slick or Java conversions active
     */
    public static void setConv(boolean slickConv){
        isSlick = slickConv;
        clearAll();

        Scanner tempScan = new Scanner(SlixConv.conv);
        while(tempScan.hasNextLine()){
            String cool = tempScan.nextLine();
            //System.out.println(cool);
            String type[] = cool.split("\\s");
            if(type[0].matches(">") && type.length > 2)
                mouseMap.put(Integer.valueOf(type[slickConv ? 1 : 2]),
                        Integer.valueOf(type[slickConv ? 2 : 1]));
            else if(type[0].matches("\\d*") && type.length > 1)
                keyMap.put(Integer.valueOf(type[slickConv ? 0 : 1]),
                        Integer.valueOf(type[slickConv ? 1 : 0]));
        }
    }

    /**
     * This function adds a key if it doesn't exist in the system, or removes
     * a key if it already exists in the system
     * @param type The type of key to add or remove from the system
     * @param add Whether you want to add a key (T) or remove a key (F)
     */
    private static void alterKeyPress(KeyIndex type, boolean add){
        if(conveyor == null)    clearAll();
        if(add && !conveyor.containsKey(type))
            conveyor.put(type, 1);
        else if(!add && conveyor.containsKey(type))
            conveyor.remove(type);
    }
}
