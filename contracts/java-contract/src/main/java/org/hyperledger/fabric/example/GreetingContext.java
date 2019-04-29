package org.hyperledger.fabric.example;

import java.time.Instant;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.naming.Binding;
import javax.naming.Name;
import javax.naming.NameClassPair;
import javax.naming.NameParser;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;

import org.hyperledger.fabric.contract.Context;
import org.hyperledger.fabric.protos.peer.ChaincodeEventPackage.ChaincodeEvent;
import org.hyperledger.fabric.protos.peer.ProposalPackage.SignedProposal;
import org.hyperledger.fabric.shim.Chaincode.Response;
import org.hyperledger.fabric.shim.ledger.CompositeKey;
import org.hyperledger.fabric.shim.ledger.KeyModification;
import org.hyperledger.fabric.shim.ledger.KeyValue;
import org.hyperledger.fabric.shim.ledger.QueryResultsIterator;
import org.hyperledger.fabric.shim.ledger.QueryResultsIteratorWithMetadata;

public class GreetingContext implements Context, javax.naming.Context {

	@Override
	public List<byte[]> getArgs() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> getStringArgs() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getFunction() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> getParameters() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getTxId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getChannelId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Response invokeChaincode(String chaincodeName, List<byte[]> args, String channel) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public byte[] getState(String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public byte[] getStateValidationParameter(String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void putState(String key, byte[] value) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setStateValidationParameter(String key, byte[] value) {
		// TODO Auto-generated method stub

	}

	@Override
	public void delState(String key) {
		// TODO Auto-generated method stub

	}

	@Override
	public QueryResultsIterator<KeyValue> getStateByRange(String startKey, String endKey) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public QueryResultsIteratorWithMetadata<KeyValue> getStateByRangeWithPagination(String startKey, String endKey,
			int pageSize, String bookmark) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public QueryResultsIterator<KeyValue> getStateByPartialCompositeKey(String compositeKey) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public QueryResultsIterator<KeyValue> getStateByPartialCompositeKey(String objectType, String... attributes) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public QueryResultsIterator<KeyValue> getStateByPartialCompositeKey(CompositeKey compositeKey) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public QueryResultsIteratorWithMetadata<KeyValue> getStateByPartialCompositeKeyWithPagination(
			CompositeKey compositeKey, int pageSize, String bookmark) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CompositeKey createCompositeKey(String objectType, String... attributes) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CompositeKey splitCompositeKey(String compositeKey) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public QueryResultsIterator<KeyValue> getQueryResult(String query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public QueryResultsIteratorWithMetadata<KeyValue> getQueryResultWithPagination(String query, int pageSize,
			String bookmark) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public QueryResultsIterator<KeyModification> getHistoryForKey(String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public byte[] getPrivateData(String collection, String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public byte[] getPrivateDataValidationParameter(String collection, String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void putPrivateData(String collection, String key, byte[] value) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setPrivateDataValidationParameter(String collection, String key, byte[] value) {
		// TODO Auto-generated method stub

	}

	@Override
	public void delPrivateData(String collection, String key) {
		// TODO Auto-generated method stub

	}

	@Override
	public QueryResultsIterator<KeyValue> getPrivateDataByRange(String collection, String startKey, String endKey) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public QueryResultsIterator<KeyValue> getPrivateDataByPartialCompositeKey(String collection, String compositeKey) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public QueryResultsIterator<KeyValue> getPrivateDataByPartialCompositeKey(String collection,
			CompositeKey compositeKey) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public QueryResultsIterator<KeyValue> getPrivateDataByPartialCompositeKey(String collection, String objectType,
			String... attributes) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public QueryResultsIterator<KeyValue> getPrivateDataQueryResult(String collection, String query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setEvent(String name, byte[] payload) {
		// TODO Auto-generated method stub

	}

	@Override
	public ChaincodeEvent getEvent() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public SignedProposal getSignedProposal() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Instant getTxTimestamp() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public byte[] getCreator() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, byte[]> getTransient() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public byte[] getBinding() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object lookup(Name name) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object lookup(String name) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void bind(Name name, Object obj) throws NamingException {
		// TODO Auto-generated method stub

	}

	@Override
	public void bind(String name, Object obj) throws NamingException {
		// TODO Auto-generated method stub

	}

	@Override
	public void rebind(Name name, Object obj) throws NamingException {
		// TODO Auto-generated method stub

	}

	@Override
	public void rebind(String name, Object obj) throws NamingException {
		// TODO Auto-generated method stub

	}

	@Override
	public void unbind(Name name) throws NamingException {
		// TODO Auto-generated method stub

	}

	@Override
	public void unbind(String name) throws NamingException {
		// TODO Auto-generated method stub

	}

	@Override
	public void rename(Name oldName, Name newName) throws NamingException {
		// TODO Auto-generated method stub

	}

	@Override
	public void rename(String oldName, String newName) throws NamingException {
		// TODO Auto-generated method stub

	}

	@Override
	public NamingEnumeration<NameClassPair> list(Name name) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public NamingEnumeration<NameClassPair> list(String name) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public NamingEnumeration<Binding> listBindings(Name name) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public NamingEnumeration<Binding> listBindings(String name) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void destroySubcontext(Name name) throws NamingException {
		// TODO Auto-generated method stub

	}

	@Override
	public void destroySubcontext(String name) throws NamingException {
		// TODO Auto-generated method stub

	}

	@Override
	public javax.naming.Context createSubcontext(Name name) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public javax.naming.Context createSubcontext(String name) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object lookupLink(Name name) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object lookupLink(String name) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public NameParser getNameParser(Name name) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public NameParser getNameParser(String name) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Name composeName(Name name, Name prefix) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String composeName(String name, String prefix) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object addToEnvironment(String propName, Object propVal) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object removeFromEnvironment(String propName) throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Hashtable<?, ?> getEnvironment() throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void close() throws NamingException {
		// TODO Auto-generated method stub

	}

	@Override
	public String getNameInNamespace() throws NamingException {
		// TODO Auto-generated method stub
		return null;
	}

}
