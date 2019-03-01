
package org.hyperledger.fabric.javaapp;

import java.net.URI;

public class License {

    /**
     * The name of the license type. It's encouraged to use an OSI compatible license.
     * (Required)
     * 
     */
    private String name;
    /**
     * The URL pointing to the license.
     * 
     */
    private URI url;

    /**
     * The name of the license type. It's encouraged to use an OSI compatible license.
     * (Required)
     * 
     */
    public String getName() {
        return name;
    }

    /**
     * The name of the license type. It's encouraged to use an OSI compatible license.
     * (Required)
     * 
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * The URL pointing to the license.
     * 
     */
    public URI getUrl() {
        return url;
    }

    /**
     * The URL pointing to the license.
     * 
     */
    public void setUrl(URI url) {
        this.url = url;
    }

}
