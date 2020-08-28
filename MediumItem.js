import React, {useState} from 'react';
import {Text, ListItem, Overlay} from 'react-native-elements';
import {Medium} from './schemas';
import {useMediums} from './MediumsProvider';

// Action sheet contains a list of actions. Each action should have a `title`
// string and `action` function property. A "Cancel" action is automatically
// added to the end of your list of actions. You must also provide the
// closeOverlay function that this component will call to request that the
// action sheet be closed.
function ActionSheet({actions, visible, closeOverlay}) {
  const cancelAction = {
    title: 'Cancel',
    action: closeOverlay,
  };
  return (
    <Overlay
      overlayStyle={{width: '90%'}}
      isVisible={visible}
      onBackdropPress={closeOverlay}>
      <>
        {[...actions, cancelAction].map(({title, action}) => (
          <ListItem
            key={title}
            title={title}
            onPress={() => {
              closeOverlay();
              action();
            }}
          />
        ))}
      </>
    </Overlay>
  );
}

// The TaskItem represents a Task in a list. When you click an item in the list,
// an action sheet appears. The action sheet contains a list of actions the user
// can perform on the task, namely deleting and changing its status.
export function MediumItem({medium}) {
  // Pull the task actions from the TasksProvider.

  const {deleteMedium, setMediumArchived} = useMediums();


  // The action sheet appears when the user presses an item in the list.
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  // Specify the list of available actions in the action list when the user
  // presses an item in the list.
  const actions = [
    {
      title: 'Delete',
      action: () => {
        deleteMedium(medium);
      },
    },
  ];

  // For each possible status other than the current status, make an action to
  // move the task into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
  if (medium.archived !== Medium.ARCHIVED_FALSE) {
    actions.push({

      title: 'Mark Archived',

      action: () => {
        setMediumArchived(medium, Medium.ARCHIVED_FALSE);
      },
    });
  }
  if (medium.archived !== Medium.ARCHIVED_TRUE) {
    actions.push({

      title: 'Mark Open',

      action: () => {
        setMediumArchived(medium, Medium.ARCHIVED_TRUE);
      },
    });
  }


  return (
    <>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => setActionSheetVisible(false)}
        actions={actions}
      />
      <ListItem
        key={medium.id}
        onPress={() => {
          setActionSheetVisible(true);
        }}
        title={medium.title}
        bottomDivider
        checkmark={
          medium.archived === Medium.ARCHIVED_TRUE ? (
            <Text>&#10004; {/* checkmark */}</Text>
          ) : medium.archived === Medium.ARCHIVED_FALSE ? (
            <Text>Open</Text>
          ) : null
        }
      />
    </>
  );
}