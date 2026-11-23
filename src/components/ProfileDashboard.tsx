import React, {useRef, useState} from 'react';
import {
  Download,
  Edit3,
  Flame,
  Plus,
  Trash2,
  Upload,
  UserCheck,
} from 'lucide-react';
import type {LangCode} from '../config/seo';
import {BADGE_DEFINITIONS, type UiStrings} from '../i18n/ui';
import type {
  CategoryId,
  MissionScenario,
  ProgressStore,
  UserProfile,
} from '../types';
import {tLoc} from '../types';
import {getRankIndex} from '../utils/storage';
import {BadgeIcon} from './svg/BadgeIcon';

interface ProfileDashboardProps {
  store: ProgressStore;
  activeProfile: UserProfile;
  categoryPct: Record<CategoryId, number>;
  globalPct: number;
  missions: MissionScenario[];
  lang: LangCode;
  ui: UiStrings;
  onSwitchProfile: (profileId: string) => void;
  onCreateProfile: (name: string) => void;
  onRenameProfile: (profileId: string, name: string) => void;
  onDeleteProfile: (profileId: string) => void;
  onImportStore: (rawJson: string) => boolean;
}

export const ProfileDashboard: React.FC<ProfileDashboardProps> = ({
  store,
  activeProfile,
  categoryPct,
  globalPct,
  missions,
  lang,
  ui,
  onSwitchProfile,
  onCreateProfile,
  onRenameProfile,
  onDeleteProfile,
  onImportStore,
}) => {
  const [newName, setNewName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [renameText, setRenameText] = useState(activeProfile.name);
  const [importNotice, setImportNotice] = useState<{ok: boolean; msg: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const rankIndex = getRankIndex(activeProfile.xp);
  const completedMissionsList = Object.values(activeProfile.completedMissions).sort((a, b) =>
    b.completedAt.localeCompare(a.completedAt)
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) return;
    onCreateProfile(trimmed);
    setNewName('');
  };

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = renameText.trim();
    if (!trimmed) return;
    onRenameProfile(activeProfile.id, trimmed);
    setEditingName(false);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(store, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `survivalcue-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const ok = onImportStore(String(reader.result ?? ''));
      setImportNotice({
        ok,
        msg: ok ? ui.profile.importSuccess : ui.profile.importError,
      });
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Multi-Profile Manager + Backup JSON */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{ui.profile.title}</h2>
            <p className="text-xs text-slate-500 mt-1">{ui.profile.resetWarning}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{ui.profile.exportJson}</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{ui.profile.importJson}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {importNotice && (
          <div
            className={`text-xs font-medium px-3 py-2 rounded-lg border ${
              importNotice.ok
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            {importNotice.msg}
          </div>
        )}

        {/* Active Profiles Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          {store.profiles.map((p) => {
            const isActive = p.id === activeProfile.id;
            return (
              <div
                key={p.id}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs ${
                  isActive
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    onSwitchProfile(p.id);
                    setRenameText(p.name);
                    setEditingName(false);
                  }}
                  className="inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{p.name}</span>
                  <span className="font-mono text-slate-500 tabular-nums">({p.xp} XP)</span>
                </button>
                {store.profiles.length > 1 && (
                  <button
                    type="button"
                    aria-label={ui.profile.deleteProfileBtn}
                    onClick={() => onDeleteProfile(p.id)}
                    className="ml-1 text-slate-400 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}

          {editingName ? (
            <form onSubmit={handleRenameSubmit} className="inline-flex items-center gap-1.5">
              <input
                type="text"
                value={renameText}
                onChange={(e) => setRenameText(e.target.value)}
                maxLength={32}
                className="px-2.5 py-1 text-xs border border-slate-300 rounded-md"
              />
              <button
                type="submit"
                className="px-2.5 py-1 text-xs font-semibold bg-slate-900 text-white rounded-md cursor-pointer"
              >
                OK
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => {
                setRenameText(activeProfile.name);
                setEditingName(true);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{ui.profile.renameProfileBtn}</span>
            </button>
          )}
        </div>

        <form onSubmit={handleCreate} className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            maxLength={32}
            placeholder={ui.profile.createProfilePlaceholder}
            className="px-3 py-2 text-xs border border-slate-200 rounded-lg min-w-[210px] focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{ui.profile.createProfileBtn}</span>
          </button>
        </form>
      </div>

      {/* KPI Metrics & 4 Sector Mastery Bars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500">{ui.profile.rank}</div>
          <div className="text-lg font-bold text-slate-900 mt-1">{ui.ranks[rankIndex]}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500">{ui.profile.xp}</div>
          <div className="text-2xl font-extrabold font-mono tabular-nums text-emerald-700 mt-1">
            {activeProfile.xp}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500">{ui.profile.streak}</div>
          <div className="text-2xl font-extrabold font-mono tabular-nums text-amber-600 mt-1 inline-flex items-center gap-1.5">
            <Flame className="w-5 h-5" />
            <span>
              {activeProfile.streakDays} {ui.profile.days}
            </span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500">{ui.profile.globalMastery}</div>
          <div className="text-2xl font-extrabold font-mono tabular-nums text-blue-700 mt-1">
            {globalPct}%
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900">{ui.profile.categoryMastery}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['blackout', 'disaster', 'urban', 'wilderness'] as CategoryId[]).map((cat) => (
            <div key={cat} className="border border-slate-200 rounded-lg p-3.5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-800">{ui.categories[cat]}</span>
                <span className="font-mono font-bold tabular-nums text-slate-900">
                  {categoryPct[cat]}%
                </span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-700 transition-all duration-300"
                  style={{width: `${categoryPct[cat]}%`}}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Visual Badges Grid */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">{ui.profile.badgesTitle}</h3>
          <span className="text-xs font-mono tabular-nums text-slate-500">
            {activeProfile.unlockedBadges.length} / {BADGE_DEFINITIONS.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BADGE_DEFINITIONS.map((badge) => {
            const unlocked = activeProfile.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`border rounded-lg p-3.5 flex items-center gap-3 ${
                  unlocked
                    ? 'border-emerald-200 bg-emerald-50/40'
                    : 'border-slate-200 bg-slate-50 opacity-65'
                }`}
              >
                <BadgeIcon iconKey={badge.iconKey} unlocked={unlocked} />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {tLoc(badge.title, lang)}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {tLoc(badge.description, lang)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mission History Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold text-slate-900">{ui.profile.historyTitle}</h3>
          <div className="text-xs text-slate-500 font-mono tabular-nums">
            {ui.profile.missionsCompletedCount}: {completedMissionsList.length} ·{' '}
            {ui.profile.lessonsCompletedCount}: {activeProfile.completedLessons.length} ·{' '}
            {ui.profile.challengesCompletedCount}: {activeProfile.completedChallenges.length}
          </div>
        </div>

        {completedMissionsList.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="py-2 pr-4 font-semibold">Scenario</th>
                  <th className="py-2 pr-4 font-semibold">Sector</th>
                  <th className="py-2 pr-4 font-semibold">Score</th>
                  <th className="py-2 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {completedMissionsList.slice(0, 12).map((rec) => {
                  const mission = missions.find((m) => m.id === rec.missionId);
                  return (
                    <tr key={rec.missionId}>
                      <td className="py-2.5 pr-4 font-semibold text-slate-900">
                        {mission ? tLoc(mission.title, lang) : rec.missionId}
                      </td>
                      <td className="py-2.5 pr-4 text-slate-600">
                        {ui.categories[rec.category]}
                      </td>
                      <td className="py-2.5 pr-4 font-mono font-bold tabular-nums text-emerald-700">
                        {rec.scorePct}%
                      </td>
                      <td className="py-2.5 font-mono tabular-nums text-slate-500">
                        {rec.completedAt.slice(0, 10)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
