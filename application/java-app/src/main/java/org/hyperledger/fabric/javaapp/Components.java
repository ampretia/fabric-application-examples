
package org.hyperledger.fabric.javaapp;

import java.util.HashMap;
import java.util.Map;

public class Components {

    private Schemas schemas;
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    public Schemas getSchemas() {
        return schemas;
    }

    public void setSchemas(Schemas schemas) {
        this.schemas = schemas;
    }

    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

}
