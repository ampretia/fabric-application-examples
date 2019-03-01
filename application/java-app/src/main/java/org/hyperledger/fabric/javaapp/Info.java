
package org.hyperledger.fabric.javaapp;

import java.util.HashMap;
import java.util.Map;


/**
 * General information about the API.
 * 
 */
public class Info {

    /**
     * A unique and precise title of the API.
     * (Required)
     * 
     */
    private String title;
    /**
     * A semantic version number of the API.
     * (Required)
     * 
     */
    private String version;
    /**
     * A longer description of the API. Should be different from the title.  GitHub Flavored Markdown is allowed.
     * 
     */
    private String description;
    /**
     * The terms of service for the API.
     * 
     */
    private String termsOfService;
    /**
     * Contact information for the owners of the API.
     * 
     */
    private Contact contact;
    private License license;
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    /**
     * A unique and precise title of the API.
     * (Required)
     * 
     */
    public String getTitle() {
        return title;
    }

    /**
     * A unique and precise title of the API.
     * (Required)
     * 
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * A semantic version number of the API.
     * (Required)
     * 
     */
    public String getVersion() {
        return version;
    }

    /**
     * A semantic version number of the API.
     * (Required)
     * 
     */
    public void setVersion(String version) {
        this.version = version;
    }

    /**
     * A longer description of the API. Should be different from the title.  GitHub Flavored Markdown is allowed.
     * 
     */
    public String getDescription() {
        return description;
    }

    /**
     * A longer description of the API. Should be different from the title.  GitHub Flavored Markdown is allowed.
     * 
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * The terms of service for the API.
     * 
     */
    public String getTermsOfService() {
        return termsOfService;
    }

    /**
     * The terms of service for the API.
     * 
     */
    public void setTermsOfService(String termsOfService) {
        this.termsOfService = termsOfService;
    }

    /**
     * Contact information for the owners of the API.
     * 
     */
    public Contact getContact() {
        return contact;
    }

    /**
     * Contact information for the owners of the API.
     * 
     */
    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public License getLicense() {
        return license;
    }

    public void setLicense(License license) {
        this.license = license;
    }

    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

}
