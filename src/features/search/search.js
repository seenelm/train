import React, {useState, useRef} from 'react';
import {
  Animated,
  Text,
  TextInput,
  FlatList,
  View,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Profile from '../../components/profile';

import {athletes} from '../../assets/Data';

const Search = () => {
  const [search, setSearch] = useState('');

  // create animated value
  const animation = useRef(new Animated.Value(0)).current;

  // run animation
  const handleFocus = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // interpolate animated value
  const textTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const textOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const handleTap = () => {
    console.log('Item tapped');
  };

  // Filter the athletes array based on search input
  const filteredAthletes = athletes.filter(
    athlete =>
      athlete.name.toLowerCase().includes(search.toLowerCase()) ||
      athlete.content.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={searchStyles.container}>
      <Animated.Text
        style={[
          searchStyles.text,
          {transform: [{translateY: textTranslate}], opacity: textOpacity},
        ]}>
        Search
      </Animated.Text>
      <Animated.View style={{transform: [{translateY: textTranslate}]}}>
        <TextInput
          style={searchStyles.TextInput}
          placeholder="Jump to..."
          onChangeText={text => setSearch(text)}
          value={search}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCorrect={false}
          spellCheck={false}
          keyboardAppearance="dark"
          autoFocus={true}
        />
      </Animated.View>
      {search.length > 0 && filteredAthletes.length > 0 && (
        <View style={{alignSelf: 'stretch'}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
              marginLeft: 15,
            }}>
            Profiles
          </Text>
          <FlatList
            contentContainerStyle={{paddingLeft: 15}}
            data={filteredAthletes}
            renderItem={({item}) => (
              <Profile
                name={item.name}
                content={item.content}
                onPress={handleTap}
              />
            )}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 5,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 40,
    // fontWeight: 'bold',
    marginBottom: 20,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
  },
});

export default Search;
