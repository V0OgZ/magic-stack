package com.magicstack.repositories;

import com.magicstack.models.FeatureLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FeatureLogRepository extends JpaRepository<FeatureLog, Long> {
    
    List<FeatureLog> findByMageIdOrderByTimestampDesc(String mageId);
    
    @Query(value = "SELECT * FROM feature_logs ORDER BY timestamp DESC LIMIT :limit", nativeQuery = true)
    List<FeatureLog> findTopNByOrderByTimestampDesc(@Param("limit") int limit);
    
    List<FeatureLog> findByLuminosityGreaterThanOrderByTimestampDesc(Double luminosity);
    
    List<FeatureLog> findByStatusAndLuminosityGreaterThan(String status, Double luminosity);
}