import React, { useState } from 'react';
import { Play, Pause, BookOpen, Atom, Zap, Layout, Video, Mic, Plus, Trash2, ChevronUp, ChevronDown, Save, MonitorPlay } from 'lucide-react';

const ScriptBoard = () => {
    const [activeId, setActiveId] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [projectTitle, setProjectTitle] = useState("PROJECT: THE EQUILIBRIUM");

    // Initial State with your specific example data
    const [segments, setSegments] = useState([
        {
            id: 0,
            title: "The Hook",
            time: "0:00 - 0:10",
            theme: "science",
            reference: "Astro Kobi",
            audio: {
                speaker: "Narrator",
                text: "13.8 billion years ago, everything we know—every star, every atom—was compressed into a single point smaller than a proton."
            },
            visual: {
                action: "Black Screen -> Single vibrating pixel",
                mood: "Mystery / Tension",
                elements: "Vibrating Pixel, Kinetic Typography, Bass Rumble",
                description: "Total silence initially. A low, thrumming bass rumble slowly increases in pitch—like a jet engine winding up."
            }
        },
        {
            id: 1,
            title: "The Scientific Thesis",
            time: "0:10 - 0:25",
            theme: "science",
            reference: "Johnny Harris",
            audio: {
                speaker: "Narrator",
                text: "Science calls it the Singularity. A state of infinite density. But look at the data. This wasn't an explosion IN space. It was an explosion OF space."
            },
            visual: {
                action: "Paper Texture Map Overlay",
                mood: "Investigative",
                elements: "3D Grid Expansion, Red Marker Circles",
                description: "Cut to 'Top-Down' paper aesthetic. The pixel expands into a 3D mesh. A red marker circles 'SINGULARITY' while equations sync to the beat."
            }
        },
        {
            id: 2,
            title: "The Spiritual Synthesis",
            time: "0:25 - 0:45",
            theme: "spiritual",
            reference: "Magnates Media",
            audio: {
                speaker: "Narrator (Deep)",
                text: "Genesis 1:3 doesn't say God built the universe brick by brick. It says He SPOKE. 'Let. There. Be. Light.'"
            },
            visual: {
                action: "Cinematic Parallax / Gold Glow",
                mood: "Epic / Divine",
                elements: "Burning Paper, Hebrew Text, Gold Particles",
                description: "The paper map burns away to reveal an ancient scroll in 3D space. The Hebrew text 'Yehi Or' glows bright gold."
            }
        }
    ]);

    // CRUD OPERATIONS
    const activeSegmentIndex = segments.findIndex(s => s.id === activeId);
    const currentScene = segments[activeSegmentIndex] || segments[0];

    const updateField = (section, field, value) => {
        const updatedSegments = [...segments];
        if (section === 'root') {
            updatedSegments[activeSegmentIndex][field] = value;
        } else {
            updatedSegments[activeSegmentIndex][section][field] = value;
        }
        setSegments(updatedSegments);
    };

    const addNewSegment = () => {
        const newId = Math.max(...segments.map(s => s.id), 0) + 1;
        const newSegment = {
            id: newId,
            title: "New Scene",
            time: "0:00 - 0:00",
            theme: "science",
            reference: "Reference Style",
            audio: { speaker: "Speaker", text: "Enter script here..." },
            visual: { action: "Visual Action", mood: "Mood", elements: "Key Elements", description: "Describe the shot..." }
        };
        setSegments([...segments, newSegment]);
        setActiveId(newId);
    };

    const deleteSegment = (e, id) => {
        e.stopPropagation();
        if (segments.length === 1) return; // Prevent deleting last card
        const newSegments = segments.filter(s => s.id !== id);
        setSegments(newSegments);
        if (activeId === id) setActiveId(newSegments[0].id);
    };

    const moveSegment = (direction) => {
        if (direction === 'up' && activeSegmentIndex > 0) {
            const newSegments = [...segments];
            [newSegments[activeSegmentIndex], newSegments[activeSegmentIndex - 1]] = [newSegments[activeSegmentIndex - 1], newSegments[activeSegmentIndex]];
            setSegments(newSegments);
        }
        if (direction === 'down' && activeSegmentIndex < segments.length - 1) {
            const newSegments = [...segments];
            [newSegments[activeSegmentIndex], newSegments[activeSegmentIndex + 1]] = [newSegments[activeSegmentIndex + 1], newSegments[activeSegmentIndex]];
            setSegments(newSegments);
        }
    };

    // UI HELPERS
    const getThemeColor = (theme) => {
        switch (theme) {
            case 'science': return 'border-blue-500 text-blue-400 bg-blue-500/10';
            case 'spiritual': return 'border-amber-500 text-amber-400 bg-amber-500/10';
            case 'hybrid': return 'border-purple-500 text-purple-400 bg-purple-500/10';
            default: return 'border-slate-500 text-slate-400 bg-slate-500/10';
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans flex flex-col h-screen overflow-hidden">

            {/* 1. TOP BAR */}
            <header className="flex-none h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-[#0a0a0c] z-20">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
                        <MonitorPlay className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <input
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            className="bg-transparent border-none text-white font-bold tracking-tight focus:ring-0 p-0 text-lg w-64"
                        />
                        <p className="text-xs text-slate-500 font-mono">DIRECTOR'S OS v1.0</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-md text-xs font-medium transition-colors border border-slate-700">
                        <Save className="w-4 h-4" /> Save Project
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-medium shadow-lg shadow-blue-900/20 transition-colors">
                        <Play className="w-4 h-4 fill-current" /> Presentation Mode
                    </button>
                </div>
            </header>

            {/* 2. MAIN WORKSPACE */}
            <div className="flex-grow flex overflow-hidden">

                {/* LEFT: TIMELINE (SCROLLABLE) */}
                <div className="w-80 flex-none border-r border-slate-800 flex flex-col bg-[#0f0f11]">
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#0f0f11]">
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Script Timeline</h2>
                        <button onClick={addNewSegment} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="overflow-y-auto flex-grow p-3 space-y-2 custom-scrollbar">
                        {segments.map((segment, index) => (
                            <div
                                key={segment.id}
                                onClick={() => setActiveId(segment.id)}
                                className={`w-full text-left p-3 rounded-xl border cursor-pointer transition-all duration-200 group relative ${activeId === segment.id
                                        ? `${getThemeColor(segment.theme)} border-opacity-100 shadow-lg bg-opacity-20`
                                        : 'border-slate-800 bg-[#161618] hover:border-slate-700 hover:bg-[#1c1c1f]'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeId === segment.id ? 'bg-black/30' : 'bg-black/20 text-slate-500'}`}>
                                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                    </span>
                                    {segments.length > 1 && (
                                        <button
                                            onClick={(e) => deleteSegment(e, segment.id)}
                                            className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-slate-600 transition-opacity"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                                <h3 className={`font-semibold text-sm truncate mb-1 ${activeId === segment.id ? 'text-white' : 'text-slate-300'}`}>
                                    {segment.title}
                                </h3>
                                <p className="text-[10px] text-slate-500 font-mono">{segment.time}</p>

                                {/* Active Indicator Line */}
                                {activeId === segment.id && (
                                    <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${segment.theme === 'science' ? 'bg-blue-500' :
                                            segment.theme === 'spiritual' ? 'bg-amber-500' : 'bg-purple-500'
                                        }`}></div>
                                )}
                            </div>
                        ))}

                        <button onClick={addNewSegment} className="w-full py-4 border-2 border-dashed border-slate-800 rounded-xl text-slate-600 hover:border-slate-700 hover:text-slate-400 hover:bg-slate-900/50 transition-all text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-2">
                            <Plus className="w-4 h-4" /> Add Scene
                        </button>
                    </div>
                </div>

                {/* MIDDLE: EDITOR & PREVIEW (SCROLLABLE) */}
                <div className="flex-grow flex flex-col overflow-y-auto bg-[#0a0a0c] p-8">

                    {/* CONTROL BAR */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <button onClick={() => moveSegment('up')} disabled={activeSegmentIndex === 0} className="p-2 border border-slate-800 rounded-lg hover:bg-slate-800 disabled:opacity-30">
                                <ChevronUp className="w-4 h-4" />
                            </button>
                            <button onClick={() => moveSegment('down')} disabled={activeSegmentIndex === segments.length - 1} className="p-2 border border-slate-800 rounded-lg hover:bg-slate-800 disabled:opacity-30">
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
                            {['science', 'spiritual', 'hybrid'].map(theme => (
                                <button
                                    key={theme}
                                    onClick={() => updateField('root', 'theme', theme)}
                                    className={`px-3 py-1 rounded text-xs font-medium capitalize transition-all ${currentScene.theme === theme
                                            ? (theme === 'science' ? 'bg-blue-600 text-white' : theme === 'spiritual' ? 'bg-amber-600 text-white' : 'bg-purple-600 text-white')
                                            : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    {theme}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* VISUAL CANVAS (PREVIEW) */}
                    <div className="w-full aspect-video bg-black rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative group mb-8 flex-none">
                        {/* Overlay UI */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                            <div className="flex justify-between items-start">
                                <div className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border bg-black/80 backdrop-blur-md ${getThemeColor(currentScene.theme)}`}>
                                    {currentScene.reference}
                                </div>
                                <div className="text-xs font-mono text-white bg-black/50 px-2 py-1 rounded border border-white/10">{currentScene.time}</div>
                            </div>

                            <div className="text-center space-y-2">
                                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-2xl opacity-90">
                                    {currentScene.visual.action}
                                </h1>
                            </div>

                            <div className="w-full flex items-center gap-4">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                                >
                                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                                </button>
                                <div className="h-1 bg-white/20 rounded-full flex-grow overflow-hidden backdrop-blur-sm">
                                    <div className="h-full w-1/3 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                                </div>
                            </div>
                        </div>

                        {/* Background Atmosphere */}
                        <div className={`absolute inset-0 opacity-40 transition-all duration-700 ${currentScene.theme === 'science' ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black' :
                                currentScene.theme === 'spiritual' ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-700 via-slate-900 to-black' :
                                    'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-800 via-slate-900 to-black'
                            }`}></div>
                    </div>

                    {/* EDITING FORMS */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">

                        {/* Audio Editor */}
                        <div className="bg-[#0f0f11] p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors group">
                            <div className="flex items-center gap-2 mb-4 text-slate-400">
                                <Mic className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Audio Script</span>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Speaker</label>
                                    <input
                                        type="text"
                                        value={currentScene.audio.speaker}
                                        onChange={(e) => updateField('audio', 'speaker', e.target.value)}
                                        className="w-full bg-[#161618] border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Narration</label>
                                    <textarea
                                        rows={6}
                                        value={currentScene.audio.text}
                                        onChange={(e) => updateField('audio', 'text', e.target.value)}
                                        className="w-full bg-[#161618] border border-slate-800 rounded-lg px-3 py-2 text-base text-slate-200 leading-relaxed focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Visual Editor */}
                        <div className="bg-[#0f0f11] p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors group">
                            <div className="flex items-center gap-2 mb-4 text-slate-400">
                                <Video className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Visual Directive</span>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Main Action (Headline)</label>
                                        <input
                                            type="text"
                                            value={currentScene.visual.action}
                                            onChange={(e) => updateField('visual', 'action', e.target.value)}
                                            className="w-full bg-[#161618] border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Reference Style</label>
                                        <input
                                            type="text"
                                            value={currentScene.reference}
                                            onChange={(e) => updateField('root', 'reference', e.target.value)}
                                            className="w-full bg-[#161618] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:ring-1 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Detailed Description</label>
                                    <textarea
                                        rows={3}
                                        value={currentScene.visual.description}
                                        onChange={(e) => updateField('visual', 'description', e.target.value)}
                                        className="w-full bg-[#161618] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Key Visual Elements</label>
                                    <input
                                        type="text"
                                        value={currentScene.visual.elements}
                                        onChange={(e) => updateField('visual', 'elements', e.target.value)}
                                        className="w-full bg-[#161618] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-400 focus:ring-1 focus:ring-blue-500 outline-none font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ScriptBoard;
