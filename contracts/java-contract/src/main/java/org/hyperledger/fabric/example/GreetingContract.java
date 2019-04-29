
package org.hyperledger.fabric.example;

import org.hyperledger.fabric.contract.Context;
import org.hyperledger.fabric.contract.ContractInterface;
import org.hyperledger.fabric.contract.annotation.Contract;
import org.hyperledger.fabric.contract.annotation.Default;
import org.hyperledger.fabric.contract.annotation.Transaction;
import org.json.JSONObject;

import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import static java.nio.charset.StandardCharsets.UTF_8;

@Contract(namespace = "GreetingContract", info = @Info(title = "Greeting contract", description = "Hello world of the smart contract type", version = "0.0.1-SNAPSHOT", license = @License(name = "Apache 2.0 License", url = "http://www.apache.org/licenses/LICENSE-2.0.html"), contact = @Contact(email = "fred@example.com", name = "Fred Bloggs", url = "http://fred.blogs.me")))
@Default
public class GreetingContract implements ContractInterface {

	public GreetingContract() {

	}

	@Override
	public void afterTransaction() {
		System.out.println(">> Custom After Transaction function impl");
	}

	@Override
	public void beforeTransaction() {
		System.out.println(">> Custom Before Transaction function impl");
	}

	@Override
	public void unknownTransaction() {
		System.out.println(">> Custom Unkown Transaction function impl");
	}

	@Transaction()
	public void setupLedger() {
		System.out.println("> GreetingContract:setupLedger");
		Context ctx = getContext();
		Greeting greeting = new Greeting("Hello World!");
		ctx.putState("GREETING", greeting.toJSONString().getBytes(UTF_8));
		System.out.println("< GreetingContract:setupLedger");
	}

	@Transaction()
	public String getGreetingText() {
		System.out.println("> GreetingContract:getGreetingText");
		Context ctx = this.getContext();
		JSONObject json = new JSONObject(new String(ctx.getState("GREETING"),UTF_8));
		
        String text = json.getString("text");
		System.out.println("< GreetingContract:getGreetingText "+text);
		return text;
	}

	@Transaction()
	public Greeting setGreetingText(String text) {
		System.out.println("> GreetingContract:setGreetingText of "+text);       
        Greeting greeting = new Greeting(text);
		Context ctx = this.getContext();
     
        ctx.putState("GREETING", greeting.toJSONString().getBytes(UTF_8));
		System.out.println("< GreetingContract:setGreetingText of ");   

        return greeting;
	}

	@Transaction()
	public void kitchenSink(byte _byte,short _short,int _int,long _long, double _double, float _float, boolean _boolean){
		
	}

}