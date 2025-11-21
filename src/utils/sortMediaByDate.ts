import { SortMedia } from "@components/constants"
import { type IMediaSlide } from "@components/Media"

export const sortMediaByDate = (media: IMediaSlide[] | null, sorting: keyof typeof SortMedia | null) => {
  // Note: sorting relies on activityId - the newer activity the bigger its id
  return (media ?? []).toSorted((a, b) => {
    const direction = sorting === SortMedia.DESC ? -1 : 1
    if (a.activityId === b.activityId) {          
      // swap photos belonging to the same activity (same activityId) to change their order when sorting
      return -1
    }
    return direction * (a.activityId - b.activityId)
  })
}
