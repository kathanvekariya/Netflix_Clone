import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigation();

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${query}`
      );
      const jsonData = await response.json();
      setSuggestions(jsonData.map((item) => item.show));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${query}`
      );
      const jsonData = await response.json();
      setResults(jsonData.map((item) => item.show));
      setSuggestions([]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShowPress = (show) => {
    navigation.navigate("Details", { show });
  };

  const handleInputChange = (text) => {
    setQuery(text);
    if (text.length > 1) {
      fetchSuggestions(text);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    handleSearch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion) => (
            <TouchableOpacity
              key={suggestion.id}
              onPress={() => handleSuggestionPress(suggestion)}
              style={styles.suggestionItem}
            >
              <Text style={styles.suggestionText}>{suggestion.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <Text style={styles.resultsHeader}>Results</Text>
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleShowPress(item)}
            style={styles.showContainer}
          >
            <Image
              source={{
                uri: item.image
                  ? item.image.medium
                  : "https://via.placeholder.com/150",
              }}
              style={styles.thumbnail}
            />
            <View style={styles.showInfo}>
              <Text style={styles.showTitle}>{item.name}</Text>
              <Text style={styles.showDetails}>
                {item.premiered ? item.premiered.substring(0, 4) : "N/A"}{" "}
                {item.runtime ? `${item.runtime} min` : ""}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 5,
    padding: 10,
    color: "#fff",
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#e50914",
    borderRadius: 5,
    padding: 10,
  },
  searchButtonText: {
    color: "#fff",
  },
  suggestionsContainer: {
    backgroundColor: "#111",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  suggestionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  suggestionText: {
    color: "#fff",
  },
  resultsHeader: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  showContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#111",
    borderRadius: 5,
    padding: 10,
  },
  thumbnail: {
    width: 80,
    height: 120,
    borderRadius: 5,
  },
  showInfo: {
    marginLeft: 10,
    flex: 1,
  },
  showTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  showDetails: {
    color: "#888",
    marginTop: 5,
  },
});

export default SearchScreen;
