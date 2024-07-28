import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState({});
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        const jsonData = await response.json();
        setData(jsonData);
        extractLanguages(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 4 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const extractLanguages = (data) => {
    const allLanguages = data.map((item) => item.show.language);
    setLanguages(["All", ...new Set(allLanguages)]);
  };

  const categorizeData = () => {
    const categorizedData = {};

    data.forEach((item) => {
      const genres = item.show.genres;

      genres.forEach((genre) => {
        if (!categorizedData[genre]) {
          categorizedData[genre] = [];
        }
        categorizedData[genre].push(item.show);
      });
    });

    return categorizedData;
  };

  useEffect(() => {
    if (data.length > 0) {
      setCategories(categorizeData());
    }
  }, [data]);

  const filteredData =
    selectedLanguage === "All"
      ? data
      : data.filter((item) => item.show.language === selectedLanguage);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const featuredShows = filteredData.slice(0, 5);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Netflix</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          style={styles.languageScroll}
          showsHorizontalScrollIndicator={false}
        >
          {languages.map((language) => (
            <TouchableOpacity
              key={language}
              onPress={() => handleLanguageChange(language)}
              style={[
                styles.languageButton,
                selectedLanguage === language && styles.selectedLanguageButton,
              ]}
            >
              <Text
                style={[
                  styles.languageText,
                  selectedLanguage === language && styles.selectedLanguageText,
                ]}
              >
                {language}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.featuredContainer}>
          <FlatList
            data={featuredShows}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.featuredItem,
                  { display: index === currentIndex ? "flex" : "none" },
                ]}
              >
                <Image
                  source={{
                    uri: item.show.image
                      ? item.show.image.original
                      : "https://via.placeholder.com/400",
                  }}
                  style={styles.featuredImage}
                  resizeMode="contain"
                />
              </View>
            )}
            keyExtractor={(item) =>
              item.show.id ? item.show.id.toString() : `${Math.random()}`
            }
            extraData={currentIndex}
          />
          <View style={styles.dotsContainer}>
            {featuredShows.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentIndex && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {Object.keys(categories).map((category) => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories[category].slice(0, 5).map((show) => (
                <TouchableOpacity
                  key={show.id}
                  onPress={() => navigation.navigate("Details", { show })}
                  style={styles.showContainer}
                >
                  <Image
                    source={{
                      uri: show.image
                        ? show.image.medium
                        : "https://via.placeholder.com/150",
                    }}
                    style={styles.thumbnail}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  languageScroll: {
    paddingVertical: 10,
  },
  languageButton: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },
  selectedLanguageButton: {
    backgroundColor: "#e50914",
    borderColor: "#e50914",
  },
  languageText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedLanguageText: {
    color: "#fff",
  },
  featuredContainer: {
    marginVertical: 20,
  },
  featuredItem: {
    width,
  },
  featuredImage: {
    width: "100%",
    height: 400,
    borderRadius: 5,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#888",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#fff",
  },
  categoryContainer: {
    marginVertical: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 5,
    color: "#fff",
  },
  showContainer: {
    marginHorizontal: 10,
    alignItems: "center",
  },
  thumbnail: {
    width: 200,
    height: 300,
    borderRadius: 5,
  },
});

export default HomeScreen;
