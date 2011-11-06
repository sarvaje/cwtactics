package com.cwt.graphic.tools;

import com.cwt.map.PixAnimate;
import com.cwt.system.jslix.state.ScreenSkeleton;
import java.awt.Component;
import java.awt.Graphics2D;
import org.newdawn.slick.Graphics;

/*
 * MapDraw.java
 *
 * This draws the map screen for the map editor and versus screen.
 *
 * @author Carr, Crecen
 * @license Look into "LICENSE" file for further information
 * @version 08.25.11
 */
public class MapDraw extends MenuItem implements ScreenSkeleton{

    public final int MAP_X = 1;//Default x-axis size for editor maps
    public final int MAP_Y = 1;//Default y-axis size for editor maps

    private int mapsx;//The current x-axis tile width of the map
    private int mapsy;//The current y-axis tile height of the map
    private MapItem[][] drawMap;//The current map drawn to the screen

    /**
     * This class helps draw the map to the screen using a floating map. It
     * was made to be versatile so it can be used for many screens.
     * @param locx The x-axis location of this map
     * @param locy The y-axis location of this map
     * @param speed How quickly the map moves across the screen
     */
    public MapDraw(int locx, int locy, double speed){
        super(locx, locy, speed);
        mapsx = MAP_X;
        mapsy = MAP_Y;
        drawMap = new MapItem[mapsx][mapsy];
        resetMap();
    }
    
    public void update(int width, int height, int sysTime, int mouseScroll){

    }

    public void render(Graphics g){
        for(int i = 0; i < mapsx; i++){
            for(int j = 0; j < mapsy; j++){
                if(drawMap[i][j].change)
                    createNewImage(drawMap[i][j], i, j);
                if(drawMap[i][j].terrain >= 0){
                    g.drawImage(PixAnimate.getSlickImage(drawMap[i][j].terrain,
                            0, 0), (int)posx+i*10, (int)posy+j*10);
                }
            }
        }
    }

    public void render(Graphics2D g, Component dthis){
        for(int i = 0; i < mapsx; i++){
            for(int j = 0; j < mapsy; j++){
                if(drawMap[i][j].change)
                    createNewImage(drawMap[i][j], i, j);
                if(drawMap[i][j].terrain >= 0){
                    g.drawImage(PixAnimate.getImage(drawMap[i][j].terrain, 
                            0, 0), i*10, j*10, dthis);
                }
            }
        }
    }

    /**
     * This function resets the map graphics
     */
    private void resetMap(){
        for(int i = 0; i < mapsx; i++){
            for(int j = 0; j < mapsy; j++)
                drawMap[i][j] = new MapItem();
        }

        //Set up terrain
        PixAnimate.getTerrain();

    }

    private MapItem createNewImage(MapItem item, int x, int y){
        if(item.terrain < 0){
            item.terrain = 0;
            item.blank = 0;
            item.connect = 0;
        }
        return item;
    }

    public void init() {}

    public void update(int timePassed) {}

    public void update(String name, int index,
            boolean isApplet, boolean seethru) {}
}
