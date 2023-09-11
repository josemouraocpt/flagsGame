import { View, Text, TouchableOpacity, TextInput, ScrollView, Pressable, Modal, DevSettings } from 'react-native';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { countries } from './countries';

export default function App() {
	const [counter, setCounter] = useState<number>(0);
	const [randomNumber, setRandomNumber] = useState<number>(Math.floor(Math.random() * countries.length));
	const [image, setImage] = useState<string>("");
	const [countriesArray, setCountriesArray] = useState<Array<T>>(countries);
	const [search, setSearch] = useState<string>("");
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [countryGuess, setCountryGuess] = useState<string>(""); 
	
	const handlePress = (data) => {
		console.log(countryGuess);
		setSearch(data);
		console.log(data);
		if(countriesArray.length == 1){
			console.log(counter);
			return;
		};
		if(countryGuess !== data.name){
			setSearch("");
			setGameOver(true);
		};

		setCounter(counter + 1);
		setSearch("");
		const newRandom = Math.floor(Math.random() * countriesArray.length);
		setRandomNumber(random => random == newRandom ? Math.floor(Math.random() * countriesArray.length) : newRandom);
		const countryUsed = countriesArray[randomNumber];	
		setCountryGuess(countryUsed.name);
		setCountriesArray(previous =>  previous.filter((country) => country.code !== countryUsed.code))
		setImage(`https://www.worldometers.info/img/flags/${countriesArray[randomNumber].code.toLowerCase()}-flag.gif`);
		console.log(countriesArray.length);
	};

	const handleTextInput = (searchText) => {
		setSearch(searchText);
	};

	const resetGame = () => {
	DevSettings.reload();
	};

	useEffect(() => {
		setImage(`https://www.worldometers.info/img/flags/${countriesArray[randomNumber].code.toLowerCase()}-flag.gif`)
		const countryUsed = countriesArray[randomNumber];
		setCountryGuess(countryUsed.name);
		setCountriesArray(previous =>  previous.filter((country) => country.code !== countryUsed.code));
	},[]);
	
return (
<View className="flex-1 items-center justify-center space-y-3 p-4 pt-6 bg-purple-900">
	<Modal animationType='slide'transparent={true} visible={gameOver} >
		<View className='bg-black/40 flex-1'>
			<View className='flex items-center bg-purple-400 p-6 my-auto space-y-2 w-10/12 mx-auto rounded-lg '>
				<Text className='text-2xl text-white'>
					Fim de Jogo!
					</Text>
				<Text className='text-xl text-white'>
					Sua pontuação foi de {counter} países
					</Text>
					<View className='rounded-full'>
						<Pressable android_ripple={{color: "#000", borderless: true}} className='bg-purple-600 p-2' onPress={resetGame}>
							<Text className='text-xl text-white'>
								Tentar Novamente
								</Text>
						</Pressable>
					</View>
			</View>
		</View>
	</Modal>
<View className='w-full h-72 border-2 border-white rounded-lg items-center justify-center py-2'>
					{image && (
						<Image
						source={image}
						placeholder="teste"
						contentFit='contain'
						transition={1000}
						className='w-4/5 h-4/5'
						/>
					)}
				</View>
				<TextInput className='border-2 border-white w-full h-10 p-2 text-white text-xl' onChangeText={handleTextInput} value={search}/>
				{search && (
				 	<ScrollView className='w-full p-2'>
				 	{countries.filter(item => {
				 		const searchTerm = search.toLowerCase();
				 		const countryName = item.name.toLowerCase();
				 		return searchTerm && countryName.startsWith(searchTerm);
				 	})
				 	.map(country => {
				 		return (
				 				<Pressable key={country.code} onPress={() => handlePress(country)} android_ripple={{color: "#000", borderless: false}} className='border-b-2 pb-1 border-white'>
				 					<Text className='text-xl text-white'> {country.name} </Text>
				 				</Pressable>
				 		)
				 	})}
				 </ScrollView>
				)}
				<Text className='text-3xl text-white'>
					{counter}
				</Text>
	</View>
);
}