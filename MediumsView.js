import React from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {useAuth} from './AuthProvider';
import {useMediums} from './MediumsProvider';
import {MediumItem} from './MediumItem';
import {AddMediumView} from './AddMediumView';

// The Tasks View displays the list of tasks of the parent TasksProvider.
// It has a button to log out and a button to add a new task.
export function MediumsView() {
  // Get the logOut function from the useAuth hook.
  const {logOut} = useAuth();

  // Get the list of tasks and the projectId from the useTasks hook.

  const {mediums, userId} = useMediums();


  return (
    <>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button type="outline" title="Log Out" onPress={logOut} />

        <AddMediumView />

      </View>
      <Text h2>My Dues</Text>
      <ScrollView>
        {mediums.map(medium => (

          <MediumItem key={`${medium._id}`} medium={medium} />

        ))}
      </ScrollView>
    </>
  );
}