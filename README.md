Navigation:
The app uses stack navigation to manage three screens - favorites place, add place, and view place.

Context API:
Context API is utilized to manage the state of the app.

Adding Places:
Users can add a new place by clicking the add button on the header. The add screen allows users to input a title, add an image using native features like image picker (which supports both gallery and camera options), select a location on a map (with the ability to either manually select or use live location via Expo location or also we can search the location using expo location geocoding ), and save the location.

Preview:
The app utilizes the Google Maps Static API to display a preview image of the selected location. Additionally, Expo location's reverse geocoding feature generates the address of the picked location.

Validation and Error Handling:
There is form validation to ensure all required fields are filled, with appropriate error handling. Loading screens are displayed during relevant processes.

Displaying Places:
All saved places are displayed in the favorites place screen. Users can tap on a place to view its details, including a map image preview. There is also a button to view the location on the map.

Deletion:
Users can delete places from the list.

Data Storage:
Place data is stored in sync storage.

Custom Fonts:
The app utilizes custom fonts for styling
