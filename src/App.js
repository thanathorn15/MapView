import {Text,Box,Button,ButtonGroup,Flex,HStack,IconButton,Input,SkeletonText,Drawer,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure} from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'
import {useJsApiLoader,GoogleMap,Marker,Autocomplete,DirectionsRenderer,} from '@react-google-maps/api'
import React,{ useRef, useState} from 'react'
import * as locationService from "./api/location-api";


const center= { lat: 13.736717, lng: 100.523186}

const  App = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
    
  })
  const [map, setMap] = useState( (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const originRef = useRef()
  const destiantionRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const [input,setInput] = useState({
    name: "",
    lat: "",
    lng: "",
    detail: "",
  })

  if (!isLoaded) {
    return <SkeletonText />
  }

  const calculateRoute = async () => {
  if (originRef.current.value === '' || destiantionRef.current.value === '') {
    return;
  }
// eslint-disable-next-line no-undef
  const directionsService = new google.maps.DirectionsService();
  const results = await directionsService.route({
    origin: originRef.current.value,
    destination: destiantionRef.current.value,
    // eslint-disable-next-line no-undef
    travelMode: google.maps.TravelMode.DRIVING,
  });
  setDirectionsResponse(results);
  console.log(results)
  setDistance(results.routes[0].legs[0].distance.text)
};

  const clearRoute = () => {
    setDirectionsResponse(null)
    setDistance('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  const hdlChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(e.target.value)
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    const res = await locationService.addLocation(input);
        setInput(res.data);
        console.log("testttttttt",res.data) 
  };

  return (

    <>


    <Flex
      position='relative'
      flexDirection='column'
      alignItems='start'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
   
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>

      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Destination' ref={destiantionRef}/>
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme='blue' type='submit' onClick={calculateRoute}>
               Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} >
          <Text>Distance: {distance} </Text>
        </HStack>
      </Box>

      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
       + Create Location
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create Your Location</DrawerHeader>

          <form >
          <Input m={3} type='text' placeholder='Name' name="name" onChange={hdlChangeInput}value={input.name}/>
          
          
          <Input m={3} type='text' placeholder='Latitude' name="lat" onChange={hdlChangeInput}value={input.lat}/>
          
          
          <Input m={3} type='text' placeholder='Longitude' name="lng" onChange={hdlChangeInput}value={input.lng}/>
          
          
          <Input m={3} type='text' placeholder='Detail' name="detail" onChange={hdlChangeInput}value={input.detail}/>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={hdlSubmit} >Save</Button>
          </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>

    
    </Flex>
    
    </>
  )
}


export default App


