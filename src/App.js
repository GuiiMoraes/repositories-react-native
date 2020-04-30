import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { getRepositories, postRepositoryLike } from "./services/api.services";

export default function App() {
  useEffect(() => {
    getRepositories().then(({ data }) => setRepositories(data));
  }, []);

  const [repositories, setRepositories] = useState([]);

  async function handleLikeRepository(id) {
    const { data } = await postRepositoryLike(id);

    const newRepos = repositories.map((repo) => {
      if (repo.id === id) repo.likes = data.likes;
      return repo;
    });

    setRepositories(newRepos);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.repositoryContainer}
          data={repositories}
          keyExtractor={(repo) => repo.id}
          renderItem={({ item: repository }) => (
            <>
              <Text style={styles.repository}>{repository.title}</Text>
              <Text style={styles.repository}>{repository.id}</Text>

              <FlatList
                style={styles.techsContainer}
                data={repository.techs}
                keyExtractor={(tech) => tech}
                renderItem={({ item: tech }) => (
                  <View style={styles.techsContainer}>
                    <Text style={styles.tech}>{tech}</Text>
                  </View>
                )}
              />
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes === 1
                    ? `${repository.likes} curtida`
                    : `${repository.likes} curtidas`}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
