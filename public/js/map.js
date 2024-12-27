// document.addEventListener("DOMContentLoaded", async () => {
//   const mapElement = document.getElementById("map");
//   if (!mapElement) return;

//   const locationString = mapElement.dataset.location;

//   if (locationString) {
//     try {
//       maptilersdk.config.apiKey = mapToken;
//       const response = await fetch(
//         `https://api.maptiler.com/geocoding/${encodeURIComponent(locationString)}.json?key=${mapToken}`
//       );
//       const data = await response.json();

//       if (data.features && data.features.length > 0) {
//         const [lng, lat] = data.features[0].geometry.coordinates;

//         // Initialize the map
//         const map = new maptilersdk.Map({
//           container: "map", // container id
//           style: maptilersdk.MapStyle.STREETS, // map style
//           center: [lng, lat], // coordinates from geocoding
//           zoom: 9, // initial zoom level
//         });

//         // Add a marker at the resolved location
//         new maptilersdk.Marker().setLngLat([lng, lat]).addTo(map);
//       } else {
//         console.error("Location not found:", locationString);
//         mapElement.innerHTML = `<p>Location not found.</p>`;
//       }
//     } catch (error) {
//       console.error("Error fetching geocoding data:", error);
//       mapElement.innerHTML = `<p>Error loading map.</p>`;
//     }
//   } else {
//     console.error("Location string is missing!");
//     mapElement.innerHTML = `<p>Location not specified.</p>`;
//   }
// });


document.addEventListener("DOMContentLoaded", async () => {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;
  
    const locationString = mapElement.dataset.location;
  
    if (locationString) {
      try {
        maptilersdk.config.apiKey = mapToken;
        const response = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(locationString)}.json?key=${mapToken}`
        );
        const data = await response.json();
  
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].geometry.coordinates;
          let placeName = data.features[0].place_name; // This usually includes the location and country
  
          // Remove the country name from the place name (assuming last part is country)
          const placeNameParts = placeName.split(',');
          placeName = placeNameParts.slice(0, -1).join(',').trim(); // Take all parts except the last one (country)
  
          // Initialize the map
          const map = new maptilersdk.Map({
            container: "map", // container id
            style: maptilersdk.MapStyle.STREETS, // map style
            center: [lng, lat], // coordinates from geocoding
            zoom: 9, // initial zoom level
          });
  
          // Add a marker at the resolved location
          const marker = new maptilersdk.Marker()
            .setLngLat([lng, lat])
            .addTo(map);
  
          // Prepare the popup content
          const popupContent = `
            <h4 style="font-size: 12px; margin: 0;">${placeName}</h4>
            <p style="font-size: 10px; margin: 0;">Exact location will be provided after booking</p>
          `;
  
          // Add a popup to the marker with adjusted size
          const popup = new maptilersdk.Popup({ offset: 25, maxWidth: '200px' }) // Set the maxWidth to make it smaller
            .setHTML(popupContent); // Set content with location and message
  
          marker.setPopup(popup);
  
          // Optionally, open the popup by default or only on click (default is click)
          marker.on('click', () => {
            popup.addTo(map);
          });
        } else {
          console.error("Location not found:", locationString);
          mapElement.innerHTML = `<p>Location not found.</p>`;
        }
      } catch (error) {
        console.error("Error fetching geocoding data:", error);
        mapElement.innerHTML = `<p>Error loading map.</p>`;
      }
    } else {
      console.error("Location string is missing!");
      mapElement.innerHTML = `<p>Location not specified.</p>`;
    }
  });
  