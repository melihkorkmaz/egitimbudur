// COMPONENTS
import { TeacherCard } from "../../teacher/components";

// HELPERS
import { mapAlgoliaTeacherHit } from "../../../utils/algolia";

export const SearchResultItem = ({ hit }) => {
  const handleOnClick = () => {
    window.open(`/teacher/${hit.objectID}`, '_blank')
  };

  return (<TeacherCard
    key={hit.objectID}
    teacher={mapAlgoliaTeacherHit(hit)}
    onClick={handleOnClick}
    asListItem />);
};