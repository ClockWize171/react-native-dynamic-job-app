import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './nearbyjobs.style';
import { COLORS, SIZES } from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import useFetch from '../../../hooks/useFetch'
import { useState } from 'react';

const Nearbyjobs = () => {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false)
  const { data, loading, error } = useFetch('search',
    {
      query: 'React developer, USA',
      num_pages: 10
    }
  )
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Jobs</Text>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={styles.headerBtn}>{showAll ? "Show Less" : "Show All"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {loading ?
          <ActivityIndicator size='large' color={COLORS.primary} />
          :
          (
            data.slice(0, showAll ? 50 : 10)?.map((job) => (
              <NearbyJobCard
                job={job}
                key={`nearby-job-${job?.job_id}`}
                handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
              />
            ))
          )
        }
        {/* error ? (<Text>Someting went wrong</Text>) : */}
      </View>
    </View>
  )
}

export default Nearbyjobs