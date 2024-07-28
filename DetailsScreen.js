import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const DetailsScreen = ({ route }) => {
  const { show } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: show.image
              ? show.image.original
              : "https://via.placeholder.com/300",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.title}>{show.name}</Text>
      <Text style={styles.rating}>
        Rating: {show.rating.average ? show.rating.average : "N/A"}
      </Text>
      <Text style={styles.summary}>{show.summary.replace(/<[^>]+>/g, "")}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  imageContainer: {
    width: "100%",
    height: 600, // Increased the height to make the image bigger
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  rating: {
    fontSize: 18,
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },
  summary: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
});

export default DetailsScreen;
