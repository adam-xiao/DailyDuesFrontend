import React, {useState} from 'react';
import {Overlay, Input, Button} from 'react-native-elements';
import {useMediums} from './MediumsProvider';

// The AddTaskView is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddMediumView() {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newMediumTitle, setNewMediumTitle] = useState('');
  const [newMediumLink, setNewMediumLink] = useState('');

  const {createMedium} = useMediums();

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{width: '90%'}}
        onBackdropPress={() => setOverlayVisible(false)}>
        <>
          <Input
            placeholder="New Medium Title"
            onChangeText={(text) => setNewMediumTitle(text)}
            autoFocus={true}
          />
          <Input
            placeholder="New Medium Link"
            onChangeText={(text) => setNewMediumLink(text)}
          />
          <Button
            title="Create"
            onPress={() => {
              setOverlayVisible(false);

              createMedium(newMediumTitle, newMediumLink);

            }}
          />
        </>
      </Overlay>
      <Button
        type="outline"
        title="Add Medium"
        onPress={() => {
          setOverlayVisible(true);
        }}
      />
    </>
  );
}