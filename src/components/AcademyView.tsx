import React, {useState} from 'react';
import {ArrowLeft, BookOpen, CheckCircle2} from 'lucide-react';
import type {LangCode} from '../config/seo';
import type {UiStrings} from '../i18n/ui';
import type {CategoryId, IllustratedLesson, SceneHotspot} from '../types';
import {tLoc} from '../types';
import {TacticalVisualStage} from './TacticalVisualStage';

interface AcademyViewProps {
  lessons: IllustratedLesson[];
  completedLessons: string[];
  lang: LangCode;
  ui: UiStrings;
  onMasterLesson: (lessonId: string) => void;
}

export const AcademyView: React.FC<AcademyViewProps> = ({
  lessons,
  completedLessons,
  lang,
  ui,
  onMasterLesson,
}) => {
  const [filter, setFilter] = useState<CategoryId | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inspectedHotspot, setInspectedHotspot] = useState<SceneHotspot | null>(null);
  const [chosenQuizIdx, setChosenQuizIdx] = useState<number | null>(null);

  const visibleLessons =
    filter === 'all' ? lessons : lessons.filter((l) => l.category === filter);
  const activeLesson = lessons.find((l) => l.id === selectedId) ?? null;

  const openLesson = (lesson: IllustratedLesson) => {
    setSelectedId(lesson.id);
    setInspectedHotspot(lesson.hotspots[0] ?? null);
    setChosenQuizIdx(null);
  };

  if (activeLesson) {
    const isMastered = completedLessons.includes(activeLesson.id);
    const quizAnsweredCorrect =
      chosenQuizIdx !== null && chosenQuizIdx === activeLesson.microChallenge.correctIndex;

    const handleQuizSelect = (idx: number) => {
      setChosenQuizIdx(idx);
      if (idx === activeLesson.microChallenge.correctIndex) {
        onMasterLesson(activeLesson.id);
      }
    };

    return (
      <div className="space-y-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{ui.nav.academy}</span>
            </button>
            <div>
              <div className="text-xs text-slate-500">
                {ui.categories[activeLesson.category]}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {tLoc(activeLesson.title, lang)}
              </h2>
            </div>
          </div>

          {isMastered && (
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
              <span>{ui.controls.lessonMastered}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7">
            <TacticalVisualStage
              scene={activeLesson.scene}
              visual={{
                ...activeLesson.visualPreset,
                activeZoneId: inspectedHotspot?.id,
                flashlightTarget: inspectedHotspot
                  ? {x: inspectedHotspot.x, y: inspectedHotspot.y}
                  : activeLesson.visualPreset.flashlightTarget,
                statusTag: inspectedHotspot?.label ?? activeLesson.subtitle,
              }}
              hotspots={activeLesson.hotspots}
              lang={lang}
              ui={ui}
              activeHotspotId={inspectedHotspot?.id ?? null}
              onHotspotSelect={(spot) => setInspectedHotspot(spot)}
            />
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                {tLoc(activeLesson.subtitle, lang)}
              </h3>
              <ul className="space-y-2">
                {activeLesson.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                    <span className="font-mono font-bold text-emerald-700 tabular-nums mt-0.5">
                      0{i + 1}.
                    </span>
                    <span>{tLoc(pt, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-3">
              <div className="text-xs font-semibold text-blue-700">
                {ui.controls.markMastered}
              </div>
              <p className="text-sm font-semibold text-slate-900">
                {tLoc(activeLesson.microChallenge.question, lang)}
              </p>

              <div className="space-y-2">
                {activeLesson.microChallenge.options.map((opt, idx) => {
                  const isChosen = chosenQuizIdx === idx;
                  const isCorrect = idx === activeLesson.microChallenge.correctIndex;
                  let cls = 'border-slate-200 bg-white hover:border-blue-400';
                  if (chosenQuizIdx !== null) {
                    if (isCorrect) cls = 'border-emerald-600 bg-emerald-50';
                    else if (isChosen) cls = 'border-red-500 bg-red-50';
                  }
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuizSelect(idx)}
                      className={`w-full text-left border rounded-lg p-3 text-xs font-medium text-slate-800 transition-colors cursor-pointer ${cls}`}
                    >
                      {tLoc(opt, lang)}
                    </button>
                  );
                })}
              </div>

              {chosenQuizIdx !== null && (
                <div
                  className={`rounded-lg border p-3 text-xs leading-relaxed ${
                    quizAnsweredCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  {tLoc(activeLesson.microChallenge.explanation, lang)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
          {(['all', 'blackout', 'disaster', 'urban', 'wilderness'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filter === cat
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {ui.categories[cat]}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-600 tabular-nums">
          {completedLessons.length} / {lessons.length} {ui.controls.lessonMastered}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleLessons.map((lesson) => {
          const mastered = completedLessons.includes(lesson.id);
          return (
            <article
              key={lesson.id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                  <span>{ui.categories[lesson.category]}</span>
                  {mastered && (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {ui.controls.lessonMastered}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {tLoc(lesson.title, lang)}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {tLoc(lesson.subtitle, lang)}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => openLesson(lesson)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer whitespace-nowrap"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{ui.controls.openLesson}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
