// Resolves legacy `/dashboard/curriculum/topic/:topicId` URLs by redirecting
// to the new slug-based route, then renders the new TopicPage.
//
// New canonical route: `/dashboard/curriculum/:classSlug/:topicSlug`

import { useParams, Navigate } from "react-router-dom";
import { getTopicById } from "@/lib/curriculum/registry";
import TopicPage from "@/components/curriculum/TopicPage";

const TopicViewer = () => {
  const { topicId, classSlug, topicSlug } = useParams();

  // New slug-based route — render the page directly.
  if (classSlug && topicSlug) return <TopicPage />;

  // Legacy route: `/curriculum/topic/:topicId`
  if (topicId) {
    const t = getTopicById(topicId);
    if (t) return <Navigate to={`/dashboard/curriculum/${t.classSlug}/${t.topicSlug}`} replace />;
    return <Navigate to="/dashboard/curriculum" replace />;
  }

  return <Navigate to="/dashboard/curriculum" replace />;
};

export default TopicViewer;
