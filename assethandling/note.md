
Pure stub APIs as-is

```javascript
    async addCommodity(ctx,commodityJSON){

        let commodity = new Commodity(JSON.parse(commodityJSON));

        const key = ctx.stub.createCompositeKey('Commodity',
            [ 
              commodity.getTradingSymbol(), 
              commodity.getTradeId() 
            ]);

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(commodity)));

        return commodity;
    }
```

Application:

```javascript
        const traderesponse = await contract.submitTransaction('tradeCommodity', 'ag',cm1.getTradeId(),'fred bloggs');
        let commoidty = JSON.parse(traderesponse.toString('utf8'));
```

----------------------------

Move to the codebase understanding the concept of from a JSON object a JS Object


```typescript
    public async addCommodity(ctx, commodity: Commodity) {
        const key = ctx.stub.createCompositeKey('Commodity', 
            [ commodity.getTradingSymbol(), commodity.getTradeId() ]);
        
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(commodity)));
        return commodity
    }
```

Application: 

```javascript
        const traderesponse = await contract.submitTransaction('tradeCommodity',
        JSON.stringify(
            {$type:'Commodity',tradingSymbol:'ag',...}
        );
        let commoidty = JSON.parse(traderesponse.toString('utf8'));
```

```javascript
        const tradeCommodity = await contract.createTransaction('tradeCommodity');
        
        let cm1 = new Commodity(
            {
                tradingSymbol:'ag',
                description:'silver',
                quantity:2000,
                tradeId:uuidv1()
            });

        let returnedCommodity = tradeCommodity.submit(cm1)

```
^ would need the transaction class to be augmented.



