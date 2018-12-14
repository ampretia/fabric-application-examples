
package org.hyperledger.fabric.javaapp;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;


/**
 * Contact information for the owners of the API.
 * 
 */
public class Contact {

    /**
     * The identifying name of the contact person/organization.
     * 
     */
    private String name;
    /**
     * The URL pointing to the contact information.
     * 
     */
    private URI url;
    /**
     * The email address of the contact person/organization.
     * 
     */
    private String email;
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    /**
     * The identifying name of the contact person/organization.
     * 
     */
    public String getName() {
        return name;
    }

    /**
     * The identifying name of the contact person/organization.
     * 
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * The URL pointing to the contact information.
     * 
     */
    public URI getUrl() {
        return url;
    }

    /**
     * The URL pointing to the contact information.
     * 
     */
    public void setUrl(URI url) {
        this.url = url;
    }

    /**
     * The email address of the contact person/organization.
     * 
     */
    public String getEmail() {
        return email;
    }

    /**
     * The email address of the contact person/organization.
     * 
     */
    public void setEmail(String email) {
        this.email = email;
    }

    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

}
