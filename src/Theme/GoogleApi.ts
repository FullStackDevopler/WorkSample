export const calculateTimeDurationAndDistance = async (origin: string, destination: string) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=AIzaSyD18in84QdXIsB25ms_snw1C-xxTkQsDd8`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('data in calculateTimeDuration', JSON.stringify(data));

      if (data.status === "OK") {
        const duration = data?.rows[0]?.elements[0]?.duration?.value || 0;
        const distance = data?.rows[0]?.elements[0]?.distance?.value || 0;
        return { duration, distance }
      } else {
        console.log('Error in distance API response:', data);
        return { duration: 0, distance: 0 };
      }
    } catch (error: any) {
      console.log('Error fetching distance API data:', error);
      return { duration: 0, distance: 0 };
    }
  };


  export const calculateTimeDurationAndDistance2 = async (originLat: number, originLng: number, destinationLat: number, destinationLng: number) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${originLat},${originLng}&destinations=${destinationLat},${destinationLng}&key=AIzaSyD18in84QdXIsB25ms_snw1C-xxTkQsDd8`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('data in calculateTimeDuration', JSON.stringify(data));

      if (data.status === "OK") {
        const duration = data?.rows[0]?.elements[0]?.duration?.value || 0;
        const distance = data?.rows[0]?.elements[0]?.distance?.value || 0;
        return { duration, distance }
      } else {
        console.log('Error in distance API response:', data);
        return { duration: 0, distance: 0 };
      }
    } catch (error: any) {
      console.log('Error fetching distance API data:', error);
      return { duration: 0, distance: 0 };
    }
};
