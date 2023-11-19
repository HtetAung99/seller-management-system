import React, { useRef } from 'react';
import s from './styles';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { validateBadge } from '../../models/helper';

export default function SearchBar({
  pendingHandle,
  pendingLength,
  setSearchInput,
}) {
  const inputFocus = useRef(null);
  const onFocus = () => inputFocus.current.focus();
  return (
    <View style={s.layout}>
      <Pressable style={s.search} onPress={onFocus}>
        <Fontisto style={s.icon} color="#ccc" size={20} name="search" />
        <TextInput
          placeholder="Search"
          style={s.input}
          ref={inputFocus}
          onChangeText={setSearchInput}
          placeholderTextColor="#ddd"
        />
      </Pressable>
      <TouchableOpacity
        onPress={pendingHandle}
        style={[s.pending, pendingLength < 1 && { borderColor: '#ccc' }]}
        disabled={Boolean(pendingLength < 1)}>
        {pendingLength > 0 && (
          <View style={s.badge}>
            <Text style={s['badge-no']}>{validateBadge(pendingLength)}</Text>
          </View>
        )}
        <MaterialIcons
          size={35}
          name="pending-actions"
          color={pendingLength < 1 ? '#ccc' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
}
