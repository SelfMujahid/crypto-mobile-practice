import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';

export default function App() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      // Simulated API call - practice ke liye
      setTimeout(() => {
        setPrices({
          bitcoin: Math.random() * 50000 + 20000,
          ethereum: Math.random() * 3000 + 1000
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch prices');
      setLoading(false);
    }
  };

  const getSignal = (price) => {
    if (price < 30000) return { signal: 'BUY', color: 'green' };
    if (price > 50000) return { signal: 'SELL', color: 'red' };
    return { signal: 'HOLD', color: 'orange' };
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🤖 Crypto Trading App</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Live Prices</Text>
        
        {loading ? (
          <Text>Loading prices...</Text>
        ) : (
          <>
            {prices.bitcoin && (
              <View style={styles.priceRow}>
                <Text>Bitcoin: ${prices.bitcoin.toFixed(2)}</Text>
                <Text style={[styles.signal, {color: getSignal(prices.bitcoin).color}]}>
                  {getSignal(prices.bitcoin).signal}
                </Text>
              </View>
            )}
            
            {prices.ethereum && (
              <View style={styles.priceRow}>
                <Text>Ethereum: ${prices.ethereum.toFixed(2)}</Text>
                <Text style={styles.signal}>HOLD</Text>
              </View>
            )}
          </>
        )}
      </View>

      <Button 
        title="Refresh Prices" 
        onPress={fetchPrices}
        disabled={loading}
      />
      
      <View style={styles.features}>
        <Text style={styles.featureTitle}>Practice Features:</Text>
        <Text>• Price Display</Text>
        <Text>• Trading Signals</Text>
        <Text>• Auto-refresh</Text>
        <Text>• Error Handling</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  signal: {
    fontWeight: 'bold'
  },
  features: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 10
  },
  featureTitle: {
    fontWeight: 'bold',
    marginBottom: 5
  }
});
