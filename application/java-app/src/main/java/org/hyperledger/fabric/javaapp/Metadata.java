
package org.hyperledger.fabric.javaapp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Hyperledger Fabric Contract Definition JSON Schema
 * <p>
 * 
 * 
 */
public class Metadata {

    /**
     * General information about the API.
     * (Required)
     * 
     */
    private Info info;
    /**
     * 
     * (Required)
     * 
     */
    private Contracts contracts;
    private Components components;
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();
    private List<Info> infos = new ArrayList<Info>();
    /**
     * General information about the API.
     * (Required)
     * 
     */
    public Info[] getInfo() {
        return (Info[]) infos.toArray();
    }

    /**
     * General information about the API.
     * (Required)
     * 
     */
    public void setInfo(Info info) {
        this.info = info;
    }

    /**
     * 
     * (Required)
     * 
     */
    public Contracts getContracts() {
        return contracts;
    }

    /**
     * 
     * (Required)
     * 
     */
    public void setContracts(Contracts contracts) {
        this.contracts = contracts;
    }

    public Components getComponents() {
        return components;
    }

    public void setComponents(Components components) {
        this.components = components;
    }

    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

    public String[] getStringArgs(){
        return new String[]{"a","b","c"};
    }

}
