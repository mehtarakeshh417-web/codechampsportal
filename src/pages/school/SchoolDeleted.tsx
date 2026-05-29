import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Trash2, GraduationCap, Users } from "lucide-react";

const SchoolDeleted = () => {
  const { user } = useAuth();
  const { getDeletedEntries } = useData();
  const schoolId = user?.id || "";
  const entries = getDeletedEntries(schoolId);

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-1 text-white">
          <span className="text-gradient-brand">Deleted Entries</span>
        </h1>
        <p className="font-body text-primary-foreground">Audit log of removed teachers and students</p>
      </motion.div>

      {entries.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Trash2 className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <p className="text-white/60 font-body">No deletions recorded yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((e) => {
            const Icon = e.entryType === "student" ? GraduationCap : Users;
            return (
              <motion.div key={e.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${e.entryType === "student" ? "bg-neon-green/15 text-neon-green" : "bg-neon-blue/15 text-neon-blue"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-white font-body font-bold">{e.displayName}</div>
                      <div className="text-xs text-white/60 mt-0.5">
                        {e.entryType === "student"
                          ? `Class ${e.details.class || "?"} (${e.details.section || "A"}) · Roll ${e.details.rollNo || "-"}`
                          : `${(e.details.classes || []).length} classes`}
                        {e.username && <span className="ml-2 text-white/40">· {e.username}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-white/40 whitespace-nowrap">
                    {new Date(e.deletedAt).toLocaleString()}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SchoolDeleted;
