// COMPONENTS
import { TeacherCard } from "../../teacher/components";

// HELPERS
import { mapAlgoliaTeacherHit } from "../algoliaUtils";
import { Service } from "../../teacher/types";
import React from "react";

export const SearchResultItem = ({ hit, services }) => {
  const handleOnClick = () => {
    window.open(`/teacher/${hit.objectID}`, '_blank')
  };

  return (<TeacherCard
    key={hit.objectID}
    teacher={mapAlgoliaTeacherHit(hit, services)}
    onClick={handleOnClick}
    asListItem />);
};

export const withServices = (WrappedComponent, services: Service[]) => {
  return function SearcuResultCard(props) {
    return <WrappedComponent services={services} {...props} />;
  }
}