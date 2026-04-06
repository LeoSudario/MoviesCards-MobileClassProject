import React, { Component } from "react";
import { Keyboard, ActivityIndicator, Alert, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import api from "../services/api";
import { TMDB_API_KEY } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Row,
  UserInfo,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from "../styles";

export default class Main extends Component {
  state = {
    searchText: "",
    movies: [],
    loading: false,
    page: 1,
    popularResults: [],
    currentIndex: 0,
    moviesKey: null,
  };

  async componentDidMount() {
    try {
      this.props.navigation.setParams({ onLogout: this.handleLogout });

      const loggedUserStorage = await AsyncStorage.getItem("loggedUser");
      if (!loggedUserStorage) {
        this.props.navigation.navigate("Login");
        return;
      }

      const loggedUser = JSON.parse(loggedUserStorage);
      const moviesKey = `movies_${String(loggedUser.email).toLowerCase()}`;
      this.setState({ moviesKey });

      const savedMovies = await AsyncStorage.getItem(moviesKey);

      if (savedMovies) {
        const parsed = JSON.parse(savedMovies);
        this.setState({ movies: parsed });

        if (parsed.length > 0) return;
      }

      await this.loadPopularMovies();
    } catch (error) {
      console.log("Erro ao iniciar Main:", error);
    }
  }

  componentDidUpdate(_, prevState) {
    const { movies, moviesKey } = this.state;
    if (moviesKey && prevState.movies !== movies) {
      AsyncStorage.setItem(moviesKey, JSON.stringify(movies));
    }
  }

  loadPopularMovies = async (page = 1) => {
    try {
      const response = await api.get("/movie/popular", {
        params: {
          api_key: TMDB_API_KEY,
          language: "pt-BR",
          page,
        },
      });

      this.setState({
        popularResults: response.data.results || [],
        page,
        currentIndex: 0,
      });
    } catch (error) {
      Alert.alert(
        "Erro ao carregar filmes",
        error?.response?.data?.status_message || "Falha na requisição."
      );
    }
  };

  handleAddMovie = async () => {
    try {
      const { movies, popularResults, currentIndex, page, searchText } = this.state;
      this.setState({ loading: true });

      const typedText = searchText.trim();

      if (typedText.length > 0) {
        const response = await api.get("/search/movie", {
          params: {
            api_key: TMDB_API_KEY,
            language: "pt-BR",
            query: typedText,
            page: 1,
            include_adult: false,
          },
        });

        const movie = response.data?.results?.[0];

        if (!movie) {
          Alert.alert("Filme não encontrado", "Tente outro nome.");
          this.setState({ loading: false });
          return;
        }

        if (movies.find((m) => m.id === movie.id)) {
          Alert.alert("Esse filme já foi adicionado.");
          this.setState({ loading: false, searchText: "" });
          Keyboard.dismiss();
          return;
        }

        const mappedMovie = {
          id: movie.id,
          title: movie.title,
          subtitle: `⭐ ${movie.vote_average} • Lançamento: ${movie.release_date || "N/A"}`,
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=Sem+Imagem",
          overview: movie.overview,
        };

        this.setState((prev) => ({
          movies: [mappedMovie, ...prev.movies],
          searchText: "",
          loading: false,
        }));

        Keyboard.dismiss();
        return;
      }

      let results = popularResults;
      let index = currentIndex;
      let currentPage = page;

      const fetchNextPopularPage = async () => {
        currentPage += 1;
        const resp = await api.get("/movie/popular", {
          params: {
            api_key: TMDB_API_KEY,
            language: "pt-BR",
            page: currentPage,
          },
        });
        results = resp.data.results || [];
        index = 0;
      };

      if (!results.length) {
        const resp = await api.get("/movie/popular", {
          params: {
            api_key: TMDB_API_KEY,
            language: "pt-BR",
            page: currentPage,
          },
        });
        results = resp.data.results || [];
        index = 0;
      }

      let movie = null;
      let safety = 0;
      const MAX_TRIES = 40;

      while (safety < MAX_TRIES) {
        if (index >= results.length) {
          await fetchNextPopularPage();
          if (!results.length) break;
        }

        const candidate = results[index];
        index += 1;
        safety += 1;

        if (!candidate) continue;

        const alreadyAdded = movies.some((m) => m.id === candidate.id);
        if (!alreadyAdded) {
          movie = candidate;
          break;
        }
      }

      if (!movie) {
        Alert.alert("Aviso", "Não encontrei um filme novo para adicionar agora.");
        this.setState({
          loading: false,
          popularResults: results,
          currentIndex: index,
          page: currentPage,
        });
        return;
      }

      const mappedMovie = {
        id: movie.id,
        title: movie.title,
        subtitle: `⭐ ${movie.vote_average} • Lançamento: ${movie.release_date || "N/A"}`,
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/500x750?text=Sem+Imagem",
        overview: movie.overview,
      };

      this.setState((prev) => ({
        movies: [...prev.movies, mappedMovie],
        searchText: "",
        loading: false,
        popularResults: results,
        currentIndex: index,
        page: currentPage,
      }));

      Keyboard.dismiss();
    } catch (error) {
      Alert.alert(
        "Erro ao buscar filme",
        error?.response?.data?.status_message || "Falha na requisição."
      );
      this.setState({ loading: false });
    }
  };

  handleDeleteMovie = (movieId) => {
    this.setState((prevState) => ({
      movies: prevState.movies.filter((movie) => movie.id !== movieId),
    }));
  };

  handleLogout = async () => {
    await AsyncStorage.removeItem("loggedUser");
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  render() {
    const { movies, searchText, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite o nome do filme ou clique no +"
            value={searchText}
            onChangeText={(text) => this.setState({ searchText: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddMovie}
          />
          <SubmitButton loading={loading} onPress={this.handleAddMovie}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>

        {movies.length === 0 && (
          <Text
            style={{
              color: "#bdbdbd",
              textAlign: "center",
              marginTop: 10,
              marginBottom: 6,
              paddingHorizontal: 20,
            }}
          >
            Você ainda não adicionou filmes. O app tem uma indicação popular pronta —
            clique no "+" para adicionar um filme popular à sua lista.
          </Text>
        )}

        <List
          showsVerticalScrollIndicator={false}
          data={movies}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <User>
              <Row>
                <Avatar source={{ uri: item.poster }} />
                <UserInfo>
                  <Name>{item.title}</Name>
                  <Bio numberOfLines={3}>{item.subtitle}</Bio>
                </UserInfo>
              </Row>

              <ProfileButton
                onPress={() =>
                  this.props.navigation.navigate("Details", { movie: item })
                }
              >
                <ProfileButtonText>Ver mais detalhes</ProfileButtonText>
              </ProfileButton>

              <ProfileButton
                onPress={() => this.handleDeleteMovie(item.id)}
                style={{ backgroundColor: "rgb(78, 78, 78)" }}
              >
                <ProfileButtonText>Excluir</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}