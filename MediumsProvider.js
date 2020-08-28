import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {useAuth} from './AuthProvider';
import {Medium} from './schemas';

// Create the context that will be provided to descendants of TasksProvider via
// the useTasks hook.
const MediumsContext = React.createContext(null);

const MediumsProvider = ({children, userId}) => {
    // Get the user from the AuthProvider context.
    const {user} = useAuth();
  
    // The tasks list will contain the tasks in the realm when opened.
    const [mediums, setMediums] = useState([]);
  
    // This realm does not need to be a state variable, because we don't re-render
    // on changing the realm.
    const realmRef = useRef(null);

    // The effect hook replaces lifecycle methods such as componentDidMount. In
  // this effect hook, we open the realm that contains the tasks and fetch a
  // collection of tasks.
  useEffect(() => {
    // Check that the user is logged in. You must authenticate to open a synced
    // realm.
    if (user == null) {
      console.warn('MediumsView must be authenticated!');
      return;
    }

    // Define the configuration for the realm to use the Task schema. Base the
    // sync configuration on the user settings and use the project ID as the
    // partition value. This will open a realm that contains all objects where
    // object._partition == projectId.
    const config = {
      schema: [Medium.schema],
      sync: {

        user,

        partitionValue: userId,

      },
    };

    console.log(
      `Attempting to open Realm ${userId} for user ${
        user.id
      } with config: ${JSON.stringify(config)}...`,
    );

    // Set this flag to true if the cleanup handler runs before the realm open
    // success handler, e.g. because the component unmounted.
    let canceled = false;

    // Now open the realm asynchronously with the given configuration.
    Realm.open(config)
      .then((openedRealm) => {
        // If this request has been canceled, we should close the realm.
        if (canceled) {
          openedRealm.close();
          return;
        }

        // Update the realmRef so we can use this opened realm for writing.
        realmRef.current = openedRealm;

        // Read the collection of all Tasks in the realm. Again, thanks to our
        // configuration above, the realm only contains tasks where
        // task._partition == projectId.
        const syncMediums = openedRealm.objects('Medium');

        // Watch for changes to the tasks collection.
        openedRealm.addListener('change', () => {
          // On change, update the tasks state variable and re-render.
          setMediums([...syncMediums]);
        });

        // Set the tasks state variable and re-render.
        setMediums([...syncMediums]);
      })
      .catch((error) => console.warn('Failed to open realm:', error));

    // Return the cleanup function to be called when the component is unmounted.
    return () => {
      // Update the canceled flag shared between both this callback and the
      // realm open success callback above in case this runs first.
      canceled = true;

      // If there is an open realm, we must close it.
      const realm = realmRef.current;
      if (realm != null) {
        realm.removeAllListeners();
        realm.close();
        realmRef.current = null;
      }
    };
  }, [user, userId]); // Declare dependencies list in the second parameter to useEffect().

  // Define our create, update, and delete functions that users of the
  // useTasks() hook can call.
  const createMedium = (newMediumTitle, newMediumLink) => {
    const realm = realmRef.current;

    // Open a write transaction.

    realm.write(() => {

      // Create a new task in the same partition -- that is, in the same project.

      realm.create(

        'Medium',

        new Medium({title: newMediumTitle  || 'New Medium', link: newMediumLink, partition: userId}),

      );

    });

  };

  // Define the function for updating a task's status.
  const setMediumArchived = (medium, archived) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
    if (
      ![
        Medium.ARCHIVED_TRUE,
        Medium.ARCHIVED_FALSE,
      ].includes(archived)
    ) {
      throw new Error(`Invalid Status ${archived}`);
    }
    const realm = realmRef.current;


    realm.write(() => {

      medium.archived = archived;

    });

  };

  // Define the function for deleting a task.
  const deleteMedium = (medium) => {
    const realm = realmRef.current;

    realm.write(() => {

      realm.delete(medium);

    });

  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <MediumsContext.Provider

      value={{

        createMedium,

        deleteMedium,

        setMediumArchived,

        mediums,

        userId,

      }}>

      {children}
    </MediumsContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useMediums = () => {
    const value = useContext(MediumsContext);
    if (value == null) {
      throw new Error('useMediums() called outside of a MediumsProvider?');
    }
    return value;
  };
  
export {MediumsProvider, useMediums};