package com.cwt.tools;

import com.jslix.parser.JSON_Parser;

/**
 * XML_Reader.java
 *
 * A static class used for binding both XML parsing and Language control
 * in one class. Now has support for reading in and parsing JSON files.
 *
 * @author Carr, Crecen
 * @license Look into "LICENSE" file for further information
 * @version 12.31.12
 */
public class XML_Reader {

    /** This variable helps handle and parse XML documents */
    private static JSON_Parser parser = new JSON_Parser();
    /** This variable regulates XML language conversions */
    private static LangControl control = new LangControl();

    /**
     * This function controls what XML tags are stored within the Reader
     * separated by whitespace
     * @param tagList The tag list stored within the reader
     */
    public static void addFocus(String tagList){
        parser.addFocus(tagList);
    }

    /**
     * This function parses an XML document
     * @param filename The file path to the XML document
     */
    public static void parse(String filename){
        parser.parse(filename);
    }
    
    /**
     * This function sets up the language path for the XML parser
     * @param filename The file path to the properties file
     */
    public static void setLanguagePath(String filename){
        control.getBundle(filename);
    }
    
    /**
     * This function combines getIndex() and getAttribute() into one function
     * to allow for easier access into the XML document tags
     * @param tag The list of tags split by whitespace
     * @param index The index where the XML tags are located
     * @param key The attribute key to pull from
     * @return A value associated with the key
     */
    public static String getTagAttribute(String tag, int index, String key){
    	return getIndex(tag).length > index ? getAttribute(getIndex(tag)[index], key) : "";
    }
    
    /**
     * This function combines getIndex() and getAttribute() into one function
     * to allow for easier access into the JSON document tags
     * @param tag The list of tags split by whitespace
     * @param index The index where the XML tags are located
     * @return A value associated with the key
     */
    public static String getJSONAttribute(String tag, int index){
    	return getJSONIndex(tag).length > index ? getJSONValue(getJSONIndex(tag)[index]) : "";
    }

    /**
     * This function gets the location of tags in a parsed document from
     * a whitespace delimiter string.
     * @param tag The list of tags split by whitespace
     * @return A list of locations where the tags occur
     */
    public static int[] getIndex(String tag){
        return parser.getLocation(tag);
    }

    /**
     * This function gets an attribute from the location index and a key
     * @param index The index where the XML tags are located
     * @param key The attribute key to pull from
     * @return A value associated with the key
     */
    public static String getAttribute(int index, String key){
        return parser.getAttribute(index, key);
    }

    /**
     * This function gets a list of character data from the location index
     * @param index The index where the XML tags are located
     * @return The character data associated with the index
     */
    public static String[] getCharacters(int index){
        return parser.getCharacters(index);
    }
    
    /**
     * This function gets the location of tags in a parsed document from
     * a whitespace delimiter string for JSON files.
     * @param tag The list of tags split by whitespace
     * @return A list of locations where the tags occur
     */
    public static int[] getJSONIndex(String tag){
    	return getIndex(parser.getPrefix()+" "+tag);
    }
    
    /**
     * This function gets an attribute value for JSON files from the location index
     * @param index The index where the XML tags are located
     * @return A value associated with the JSON file object
     */
    public static String getJSONValue(int index){
        return getAttribute(index, parser.DATA);
    }

    /**
     * This function converts String data into properties file language data
     * @param data The data to convert
     * @return The string converted to the language file data
     */
    public static String convert(String data){
        return control.getText(data);
    }

    /**
     * This function converts String array into properties file language array
     * @param data The array to convert
     * @return The string array converted to the language file data
     */
    public static String[] convert(String[] data){
        for(int i = 0; i < data.length; i++)
            data[i] = convert(data[i]);
        return data;
    }

    /**
     * This function clears all the data stored in the parser
     */
    public static void clear(){
        parser.clear();
    }
}
