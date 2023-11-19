import React from 'react';
import s from './styles';
import FeIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import { Pressable, Image, Text } from 'react-native';
import { Button } from 'react-native';

export const ProductPhoto = ({ image, cameraHandler, galleryHandler }) => {
  return (
    <>
      {image ? (
        <Pressable onPress={cameraHandler}>
          <Image style={s.photo} source={{ uri: image.path }} />
          <FeIcon name="edit" size={26} color="#000" style={s['edit-photo']} />
        </Pressable>
      ) : (
        <Pressable style={s.camera} onPress={cameraHandler}>
          <Icon name="md-camera-outline" size={30} color="#000" />
          <Text style={s.upload}>Upload you product</Text>
        </Pressable>
      )}
      <Button
        style={{
          marginBottom: 5,
        }}
        onPress={galleryHandler}
        title="Pick from Gallery"
      />
    </>
  );
};
