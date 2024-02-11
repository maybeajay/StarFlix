import React from 'react'
import SkeletonLoader from "expo-skeleton-loader";
const CardLoader = ({times}) => 
    {times.map((_)=><SkeletonLoader>
        <SkeletonLoader.Container
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: 'center',
            marginLeft: 10,
            width: 200, // Set the desired width for your card
            padding: 10, // Set the desired padding for your card
            borderRadius: 8, // Set the desired border radius for your card
            boxShadow: "0 2px 4px rgba(1, 1, 1, 0.2)", // Optional: Add box shadow for a card-like appearance
          }}
        >
          <SkeletonLoader.Item
            style={{
              width: 180, // Set the desired width for your card content
              height: 300, // Set the desired height for your card content
              borderRadius: 8, // Set the desired border radius for your card content
              marginVertical: 10,
            }}
          />
          <SkeletonLoader.Container
            style={{
              paddingVertical: 10,
              display: "flex",
              flexDirection: 'column',
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SkeletonLoader.Item
              style={{ width: 150, height: 10, marginBottom: 5, marginLeft: 'auto', marginRight: "auto" }}
            />
          </SkeletonLoader.Container>
        </SkeletonLoader.Container>
      </SkeletonLoader>)}
  ;

export default CardLoader