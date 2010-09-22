@Typed
package com.jslix.state

import java.awt.Component;
import java.awt.Graphics2D;
import org.newdawn.slick.Graphics;
/**
 * DrawScreen.groovy
 * 
 * This handles functions that depend on the groovy
 *
 * @author Crecen
 */
interface DrawScreen {
	def init();
        def update(int timePassed);
        def render(Graphics g);
        def render(Graphics2D g, Component dthis);
        def update(int width, int height, int sysTime, int mouseScroll);
        def update(String name, int index, boolean isApplet, boolean seeThru);
}
