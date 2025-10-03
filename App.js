import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

export default function CryptoApp() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchCryptoPrices = async () => {
    setLoading(true);
    try {
      // Simulated API response for practice
      setTimeout(() => {
        const mockData = {
          bitcoin: { usd: Math.floor(Math.random() * 50000) + 20000 },
          ethereum: { usd: Math.floor(Math.random() * 3000) + 1000 },
          dogecoin: { usd: Math.random().toFixed(3) }
        };
        
        setPrices(mockData);
        setLoading(false);
        setLastUpdated(new Date().toLocaleTimeString());
      }, 1500);
    } catch (error) {
      console.log('Error:', error);
      setLoading(false);
    }
  };

  const getTradingSignal = (price, coin) => {
    if (coin === 'bitcoin') {
      if (price < 30000) return { signal: '🚀 BUY', color: '#4CAF50' };
      if (price > 50000) return { signal: '📉 SELL', color: '#F44336' };
      return { signal: '⚡ HOLD', color: '#FF9800' };
    }
    return { signal: '📊 MONITOR', color: '#2196F3' };
  };

  useEffect(() => {
    fetchCryptoPrices();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🤖 Crypto Practice App</Text>
        <Text style={styles.subtitle}>Mobile Development Learning</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Live Crypto Prices</Text>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Fetching prices...</Text>
          </View>
        ) : (
          <>
            {Object.keys(prices).map(coin => {
              const price = prices[coin].usd;
              const signal = getTradingSignal(price, coin);
              return (
                <View key={coin} style={styles.priceRow}>
                  <View style={styles.coinInfo}>
                    <Text style={styles.coinName}>
                      {coin.charAt(0).toUpperCase() + coin.slice(1)}
                    </Text>
                    <Text style={styles.coinPrice}>${price.toLocaleString()}</Text>
                  </View>
                  <Text style={[styles.signal, { color: signal.color }]}>
                    {signal.signal}
                  </Text>
                </View>
              );
            })}
          </>
        )}

        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={fetchCryptoPrices}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Refreshing...' : '🔄 Refresh Prices'}
          </Text>
        </TouchableOpacity>

        {lastUpdated && (
          <Text style={styles.updatedText}>
            Last updated: {lastUpdated}
          </Text>
        )}
      </View>

      <View style={styles.featuresCard}>
        <Text style={styles.featuresTitle}>🎯 Practice Tasks</Text>
        <Text style={styles.featureItem}>• Add more cryptocurrencies</Text>
        <Text style={styles.featureItem}>• Change color schemes</Text>
        <Text style={styles.featureItem}>• Add portfolio tracking</Text>
        <Text style={styles.featureItem}>• Implement real API calls</Text>
        <Text style={styles.featureItem}>• Add charts and graphs</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Built with ❤️ using React Native + GitHub Mobile
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  card: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  coinInfo: {
    flex: 1,
  },
  coinName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  coinPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  signal: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  updatedText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    color: '#999',
  },
  featuresCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 15,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});
