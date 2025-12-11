<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UTM - Unique's Tracker for MakeCode: A new music editor tool for MakeCode Arcade</title>
    <meta name="description" content="A chiptune tracker and UTM music tool for MakeCode Arcade, created by @Unique." />
    <meta name="author" content="Unique" />
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

```
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        background: #1a1a1a;
        color: #e8e8e8;
        overflow: hidden;
        height: 100vh;
        display: flex;
        flex-direction: column;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
    }

    .top-panel {
        background: #242424;
        border-bottom: 1px solid #2a2a2a;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        flex-wrap: wrap;
        gap: 8px;
    }

    .top-panel h1 {
        font-size: 16px;
        font-weight: 500;
        flex: 1 1 auto;
        min-width: 120px;
    }

    .top-actions {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
    }

    button {
        background: #2a2a2a;
        color: #e8e8e8;
        border: 1px solid #3a3a3a;
        padding: 10px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        transition: all 0.15s;
        min-height: 44px;
        touch-action: manipulation;
    }

    button:hover {
        background: #333;
    }

    button:active {
        background: #3a3a3a;
    }

    input[type="text"], input[type="number"], select {
        background: #1a1a1a;
        color: #e8e8e8;
        border: 1px solid #3a3a3a;
        padding: 10px 12px;
        border-radius: 6px;
        font-size: 13px;
        min-height: 44px;
    }

    .tracker-container {
        flex: 1;
        overflow: auto;
        padding: 12px;
        -webkit-overflow-scrolling: touch;
    }

    .tracker-grid {
        display: grid;
        grid-template-columns: 40px repeat(6, minmax(70px, 1fr));
        gap: 3px;
        font-size: 11px;
        max-width: 1200px;
        margin: 0 auto;
        min-width: min-content;
    }

    @media (max-width: 768px) {
        .tracker-grid {
            grid-template-columns: 30px repeat(6, minmax(50px, 1fr));
            font-size: 9px;
            gap: 2px;
        }
    }

    .header-cell {
        background: #242424;
        padding: 12px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #2a2a2a;
        color: #999;
    }

    .step-number {
        background: #242424;
        padding: 12px 6px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #2a2a2a;
        color: #666;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .step-number.measure-start {
        border-bottom: 3px solid #666;
        font-weight: 600;
    }

    .note-cell {
        background: #242424;
        padding: 12px 6px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #2a2a2a;
        border-radius: 4px;
        min-height: 44px;
        min-width: 60px;
        color: #666;
        font-size: 10px;
        line-height: 1.3;
        user-select: none;
        -webkit-user-select: none;
        transition: all 0.1s;
    }

    .note-cell:hover {
        background: #2a2a2a;
    }

    .note-cell.active {
        font-weight: 500;
    }

    .note-cell.playing {
        filter: brightness(1.8) !important;
        box-shadow: 0 0 15px currentColor !important;
        transform: scale(1.05);
    }

    .note-cell.selected {
        outline: 3px solid #00aaff;
        outline-offset: -3px;
    }

    .note-cell.paste-preview {
        opacity: 0.6;
        outline: 2px dashed #00ff00;
        outline-offset: -2px;
    }

    .note-cell.drag-preview {
        opacity: 0.7;
        outline: 2px dashed #ffaa00;
        outline-offset: -2px;
    }

    .bottom-controls {
        background: #242424;
        border-top: 1px solid #2a2a2a;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        flex-shrink: 0;
        gap: 12px;
        flex-wrap: wrap;
    }

    .status-bar {
        background: #1a1a1a;
        border-top: 1px solid #2a2a2a;
        padding: 8px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #999;
        flex-shrink: 0;
    }

    button.active {
        background: #3a5a3a;
        border-color: #4a7a4a;
    }

    button#playBtn.active {
        background: #3a4a5a;
        border-color: #4a6a8a;
    }

    button#eraseBtn.active {
        background: #5a3a3a;
        border-color: #7a4a4a;
    }

    .left-controls, .right-controls {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
    }

    .icon-btn {
        width: 44px;
        height: 44px;
        padding: 0;
        font-size: 18px;
    }

    .instrument-list {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
    }

    .inst-chip {
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
        border: 1px solid;
        min-height: 44px;
        display: flex;
        align-items: center;
    }

    .inst-chip.selected {
        border-width: 2px;
    }

    .modal {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.8);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .modal.active {
        display: flex;
    }

    .modal-content {
        background: #242424;
        border-radius: 8px;
        border: 1px solid #2a2a2a;
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
    }

    .modal-header {
        padding: 20px 24px;
        border-bottom: 1px solid #2a2a2a;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-body {
        padding: 24px;
        overflow-y: auto;
    }

    .modal-footer {
        padding: 16px 24px;
        border-top: 1px solid #2a2a2a;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        color: #999;
        font-size: 13px;
    }

    .form-group input, .form-group select {
        width: 100%;
    }

    input[type="range"] {
        height: 6px;
        padding: 0;
    }

    .range-val {
        text-align: center;
        color: #e8e8e8;
        margin-top: 4px;
    }

    .color-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 8px;
    }

    .color-box {
        aspect-ratio: 1;
        border-radius: 4px;
        cursor: pointer;
        border: 2px solid transparent;
    }

    .color-box.selected {
        border-color: #e8e8e8;
    }

    .note-popup {
        position: fixed;
        background: #242424;
        border: 1px solid #2a2a2a;
        border-radius: 6px;
        display: none;
        z-index: 900;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        max-width: 90vw;
        max-height: 70vh;
        flex-direction: column;
    }

    .note-popup.active {
        display: flex;
    }

    .note-popup-header {
        padding: 12px 16px;
        border-bottom: 1px solid #2a2a2a;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .close-btn {
        background: none;
        border: none;
        color: #e8e8e8;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        min-height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-btn:hover {
        background: #3a3a3a;
        border-radius: 4px;
    }

    .note-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        padding: 16px;
        max-height: 60vh;
        overflow-y: auto;
        min-width: 280px;
    }

    .note-item {
        padding: 16px;
        text-align: center;
        background: #1a1a1a;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        min-height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .note-item:hover {
        background: #2a2a2a;
    }

    .code-output {
        background: #1a1a1a;
        padding: 16px;
        border-radius: 6px;
        font-size: 12px;
        white-space: pre-wrap;
        font-family: monospace;
        border: 1px solid #2a2a2a;
        line-height: 1.6;
    }

    .inst-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        background: #1a1a1a;
        border-radius: 4px;
        margin-bottom: 8px;
        border: 1px solid #2a2a2a;
    }

    .inst-list-item:hover {
        background: #2a2a2a;
    }

    .inst-actions {
        display: flex;
        gap: 8px;
    }

    .inst-actions button {
        padding: 6px 12px;
        min-height: 36px;
    }

    .mode-selector {
        display: flex;
        gap: 4px;
        background: #1a1a1a;
        padding: 4px;
        border-radius: 6px;
        border: 1px solid #3a3a3a;
    }

    .mode-selector button {
        padding: 8px 16px;
        min-height: 36px;
        border-radius: 4px;
    }

    .mode-selector button.active {
        background: #3a5a3a;
        border-color: #4a7a4a;
    }

    textarea {
        background: #1a1a1a;
        color: #e8e8e8;
        border: 1px solid #3a3a3a;
        padding: 12px;
        border-radius: 6px;
        font-family: monospace;
        font-size: 12px;
        resize: vertical;
        width: 100%;
    }

    .info-box {
        margin-bottom: 16px;
        padding: 12px;
        background: #1a1a1a;
        border-radius: 6px;
        border: 1px solid #2a2a2a;
    }

    .info-box strong {
        display: block;
        margin-bottom: 8px;
        color: #e8e8e8;
    }

    .info-box p {
        font-size: 13px;
        color: #999;
        line-height: 1.5;
    }
</style>
```

</head>
<body>
    <div class="top-panel">
        <div>
            <h1>Unique's Tracker for MakeCode (UTM)</h1>
            <div style="font-size: 11px; color: #999; margin-top: 2px;">v1.3.0</div>
        </div>
        <div class="top-actions">
            <div class="mode-selector">
                <button id="legacyModeBtn">Legacy UTMF</button>
                <button id="sequencerModeBtn">Sequencer</button>
            </div>
            <button id="instMgrBtn">Manage Instruments</button>
            <label>Steps</label>
            <input type="number" id="stepCount" value="16" min="1" max="256" style="width:70px">
            <button id="setStepsBtn">Set</button>
            <label>Beats/Measure</label>
            <input type="number" id="beatsPerMeasure" value="4" min="1" max="16" style="width:70px">
            <button id="importBtn">Import</button>
            <button id="saveProjectBtn">Save .utmf</button>
            <button id="loadProjectBtn">Load .utmf</button>
            <input type="file" id="fileInput" accept=".utmf" style="display:none">
            <input type="text" id="songName" value="mySong" style="width:140px">
            <button id="exportBtn">Export Code</button>
        </div>
    </div>

```
<div class="tracker-container">
    <div class="tracker-grid" id="grid"></div>
</div>

<div class="bottom-controls">
    <div class="left-controls">
        <button id="playBtn">Play</button>
        <button id="stopBtn">Stop</button>
        <button id="drawBtn">Draw</button>
        <button id="selectBtn">Select</button>
        <button id="eraseBtn">Erase</button>
        <button id="copyBtn" disabled>Copy</button>
        <button id="pasteBtn" disabled>Paste</button>
        <button id="clearBtn">Clear All</button>
        <button id="demoBtn">Demo</button>
        <button id="shortcutBtn">Shortcuts</button>
    </div>
    <div class="right-controls">
        <label>BPM</label>
        <input type="number" id="bpm" value="120" min="60" max="240" style="width:70px">
        <label>Note Length</label>
        <input type="number" id="noteLength" value="1" min="1" max="16" style="width:70px">
        <label>Instrument</label>
        <div class="instrument-list" id="instList"></div>
        <button class="icon-btn" id="noteBtn">♪</button>
    </div>
</div>

<div class="status-bar">
    <div id="statusText">Ready</div>
    <div id="selectionCount"></div>
</div>

<div class="note-popup" id="notePopup">
    <div class="note-popup-header">
        <h3>Select Note</h3>
        <button class="close-btn" onclick="document.getElementById('notePopup').classList.remove('active')">&times;</button>
    </div>
    <div class="note-grid" id="noteGrid"></div>
</div>

<div class="modal" id="importModal">
    <div class="modal-content" style="max-width:800px">
        <div class="modal-header">
            <h2>Import Song</h2>
            <button onclick="closeModal('importModal')">&times;</button>
        </div>
        <div class="modal-body">
            <div class="info-box">
                <strong>Import from Extension Code</strong>
                <p>Paste your utmMusic extension code below to extract and load songs. You can select which song to import if multiple songs are found.</p>
            </div>
            <textarea id="importCode" placeholder="Paste your extension code here..." style="height:200px;"></textarea>
            <div id="importSongList" style="margin-top:16px;"></div>
        </div>
        <div class="modal-footer">
            <button onclick="closeModal('importModal')">Cancel</button>
            <button onclick="parseImportCode()">Parse Code</button>
        </div>
    </div>
</div>

<div class="modal" id="instMgrModal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Manage Instruments</h2>
            <button onclick="closeModal('instMgrModal')">&times;</button>
        </div>
        <div class="modal-body">
            <button onclick="openInstEditor(null)" style="width:100%; margin-bottom:16px">+ Create New Instrument</button>
            <div id="instMgrList"></div>
        </div>
        <div class="modal-footer">
            <button onclick="closeModal('instMgrModal')">Close</button>
        </div>
    </div>
</div>

<div class="modal" id="instModal">
    <div class="modal-content">
        <div class="modal-header">
            <h2 id="instModalTitle">Instrument Editor</h2>
            <button onclick="closeModal('instModal')">&times;</button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label>Name</label>
                <input type="text" id="iName">
            </div>
            <div class="form-group">
                <label>Wave</label>
                <select id="iWave">
                    <option>Sine</option>
                    <option>Square</option>
                    <option>Sawtooth</option>
                    <option>Triangle</option>
                    <option>Noise</option>
                </select>
            </div>
            <div class="form-group">
                <label>Frequency Mode</label>
                <select id="iFreqMode">
                    <option value="relative">Relative (follows note pitch)</option>
                    <option value="fixed">Fixed frequency</option>
                </select>
            </div>
            <div class="form-group" id="freqGroup">
                <label>Start Freq (Hz)</label>
                <input type="range" id="iStart" min="50" max="2000" value="440" oninput="updateVal('start')">
                <div class="range-val" id="startVal">440</div>
            </div>
            <div class="form-group" id="freqEndGroup">
                <label>End Freq (Hz)</label>
                <input type="range" id="iEnd" min="50" max="2000" value="440" oninput="updateVal('end')">
                <div class="range-val" id="endVal">440</div>
            </div>
            <div class="form-group">
                <label>Start Volume (0-255)</label>
                <input type="range" id="iStartVol" min="0" max="255" value="255" oninput="updateVal('startVol')">
                <div class="range-val" id="startVolVal">255</div>
            </div>
            <div class="form-group">
                <label>End Volume (0-255)</label>
                <input type="range" id="iEndVol" min="0" max="255" value="0" oninput="updateVal('endVol')">
                <div class="range-val" id="endVolVal">0</div>
            </div>
            <div class="form-group">
                <label>Effect</label>
                <select id="iEffect">
                    <option>None</option>
                    <option>Vibrato</option>
                    <option>Tremolo</option>
                    <option>Warble</option>
                </select>
            </div>
            <div class="form-group">
                <label>Color</label>
                <div class="color-grid" id="colors"></div>
            </div>
            <button onclick="preview()" style="width:100%">Preview</button>
        </div>
        <div class="modal-footer">
            <button onclick="closeModal('instModal')">Cancel</button>
            <button onclick="saveInst()">Save</button>
        </div>
    </div>
</div>

<div class="modal" id="exportModal">
    <div class="modal-content" style="max-width:800px">
        <div class="modal-header">
            <h2>Export Code</h2>
            <button onclick="closeModal('exportModal')">&times;</button>
        </div>
        <div class="modal-body">
            <div style="margin-bottom:16px;padding:12px;background:#1a1a1a;border-radius:6px;border:1px solid #2a2a2a;">
                <div style="margin-bottom:12px;font-size:13px;color:#999;">
                    <strong>Quick Add to Extension:</strong><br>
                    Paste your existing utmMusic extension code below and click "Merge" to automatically add this song.
                </div>
                <textarea id="existingExtension" placeholder="Paste your existing extension file content here..." style="width:100%;height:120px;background:#242424;color:#e8e8e8;border:1px solid #3a3a3a;padding:12px;border-radius:4px;font-family:monospace;font-size:12px;resize:vertical;"></textarea>
                <div style="display:flex;gap:8px;margin-top:8px;">
                    <button onclick="mergeExtension()" style="flex:1;">Merge Song Into Extension</button>
                    <button onclick="document.getElementById('existingExtension').value=''" style="background:#3a2a2a;">Clear</button>
                </div>
            </div>
            <div style="margin-bottom:8px;font-size:13px;color:#999;">
                Manual instructions (if not using auto-merge):
            </div>
            <div class="code-output" id="code"></div>
        </div>
        <div class="modal-footer">
            <button onclick="copyCode()">Copy Instructions</button>
            <button onclick="closeModal('exportModal')">Close</button>
        </div>
    </div>
</div>

<div class="modal" id="shortcutModal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Keyboard Shortcuts</h2>
            <button onclick="closeModal('shortcutModal')">&times;</button>
        </div>
        <div class="modal-body">
            <div style="display:grid;grid-template-columns:auto 1fr;gap:12px 24px;font-size:13px;">
                <strong>Space</strong><span>Play/Stop</span>
                <strong>S</strong><span>Select Mode</span>
                <strong>E</strong><span>Erase Mode</span>
                <strong>D</strong><span>Draw Mode</span>
                <strong>Ctrl/Cmd + C</strong><span>Copy Selection</span>
                <strong>Ctrl/Cmd + V</strong><span>Paste (drag to position)</span>
                <strong>Ctrl/Cmd + X</strong><span>Cut Selection</span>
                <strong>Delete</strong><span>Clear Selection</span>
                <strong>Escape</strong><span>Cancel Paste / Clear Selection</span>
                <strong>Enter</strong><span>Confirm Paste</span>
                <strong>Mouse Drag</strong><span>Move Selection / Paste Preview</span>
            </div>
        </div>
        <div class="modal-footer">
            <button onclick="closeModal('shortcutModal')">Close</button>
        </div>
    </div>
</div>

<script>
    const ctx = new AudioContext();
    const CHANNELS = 6;
    let ROWS = 16;
    let beatsPerMeasure = 4;
    let exportMode = 'legacy'; // 'legacy' or 'sequencer'
    
    let pattern = [];
    for (let i = 0; i < ROWS; i++) {
        pattern.push([null, null, null, null, null, null]);
    }
    
    let playing = false, row = 0, timer = null, oscs = [];
    let selInst = 'square', selNote = 'C4';
    let noteMode = 'piano';
    let eraseMode = false;
    let selectMode = false;
    let drawMode = true;
    let editingInstId = null;
    let playingCells = [];
    let selNoteLength = 1;
    let selectedCells = new Set();
    let copiedNotes = [];
    let pasteMode = false;
    let pasteOffset = {row: 0, col: 0};
    let pastePreviewCells = [];
    let dragStart = null;
    let isDraggingNotes = false;
    let draggedNotes = [];
    let dragOrigin = null;
    let copiedOrigin = null;
    
    const notes = {
        'C4':262,'C#4':277,'D4':294,'D#4':311,'E4':330,'F4':349,'F#4':370,'G4':392,'G#4':415,'A4':440,'A#4':466,'B4':494,
        'C5':523,'C#5':554,'D5':587,'D#5':622,'E5':659,'F5':698,'F#5':740,'G5':784,'G#5':831,'A5':880,'A#5':932,'B5':988,
        'C3':131,'C#3':139,'D3':147,'D#3':156,'E3':165,'F3':175,'F#3':185,'G3':196,'G#3':208,'A3':220,'A#3':233,'B3':247,
        'C6':1047,'C#6':1109,'D6':1175,'D#6':1245,'E6':1319,'F6':1397,'F#6':1480,'G6':1568,'G#6':1661,'A6':1760,'A#6':1865,'B6':1976,
        'C2':65,'C#2':69,'D2':73,'D#2':78,'E2':82,'F2':87,'F#2':92,'G2':98,'G#2':104,'A2':110,'A#2':117,'B2':123,
        'C1':33,'C#1':35,'D1':37,'D#1':39,'E1':41,'F1':44,'F#1':46,'G1':49,'G#1':52,'A1':55,'A#1':58,'B1':62
    };
    
    const freqOptions = [100,150,200,250,300,350,400,450,500,600,700,800,900,1000,1200,1500,2000];
    
    let insts = {
        sine:{name:'Sine',wave:'sine',color:'#1a3a4a',text:'#6ab4d4',freqMode:'relative'},
        square:{name:'Square',wave:'square',color:'#3a2a4a',text:'#b47ad4',freqMode:'relative'},
        sawtooth:{name:'Saw',wave:'sawtooth',color:'#4a3a2a',text:'#d49a6a',freqMode:'relative'},
        triangle:{name:'Tri',wave:'triangle',color:'#2a4a3a',text:'#7ad4a4',freqMode:'relative'},
        noise:{name:'Noise',wave:'noise',color:'#3a3a3a',text:'#aaa',freqMode:'relative'}
    };
    
    const colors = ['#1a3a4a','#3a2a4a','#4a3a2a','#2a4a3a','#3a3a3a','#4a1a2a','#2a1a4a','#1a4a4a','#4a4a1a','#2a4a1a'];
    
    function updateVal(t) {
        const map = {start:'iStart',end:'iEnd',startVol:'iStartVol',endVol:'iEndVol'};
        document.getElementById(t+'Val').textContent = document.getElementById(map[t]).value;
    }
    
    function updateExportMode() {
        const legacyBtn = document.getElementById('legacyModeBtn');
        const sequencerBtn = document.getElementById('sequencerModeBtn');
        
        if (exportMode === 'legacy') {
            legacyBtn.classList.add('active');
            sequencerBtn.classList.remove('active');
        } else {
            legacyBtn.classList.remove('active');
            sequencerBtn.classList.add('active');
        }
    }
    
    function initInsts() {
        const list = document.getElementById('instList');
        list.innerHTML = '';
        Object.keys(insts).forEach(k => {
            const i = insts[k];
            const c = document.createElement('div');
            c.className = 'inst-chip'+(selInst===k?' selected':'');
            c.textContent = i.name;
            c.style.backgroundColor = i.color;
            c.style.borderColor = i.text;
            c.style.color = i.text;
            c.onclick = () => { selInst = k; initInsts(); };
            list.appendChild(c);
        });
    }
    
    function initInstMgr() {
        const list = document.getElementById('instMgrList');
        list.innerHTML = '';
        Object.keys(insts).forEach(k => {
            const i = insts[k];
            const item = document.createElement('div');
            item.className = 'inst-list-item';
            item.style.borderLeft = `4px solid ${i.color}`;
            
            const info = document.createElement('div');
            info.innerHTML = `<strong>${i.name}</strong><br><small>${i.wave} | ${i.effect || 'No effect'} | ${i.freqMode || 'relative'}</small>`;
            
            const actions = document.createElement('div');
            actions.className = 'inst-actions';
            
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.onclick = () => openInstEditor(k);
            
            actions.appendChild(editBtn);
            
            if (i.custom) {
                const delBtn = document.createElement('button');
                delBtn.textContent = 'Delete';
                delBtn.style.background = '#4a2a2a';
                delBtn.onclick = () => deleteInst(k);
                actions.appendChild(delBtn);
            }
            
            item.appendChild(info);
            item.appendChild(actions);
            list.appendChild(item);
        });
    }
    
    function openInstEditor(id) {
        editingInstId = id;
        const isEdit = id !== null;
        document.getElementById('instModalTitle').textContent = isEdit ? 'Edit Instrument' : 'Create Instrument';
        
        if (isEdit) {
            const inst = insts[id];
            document.getElementById('iName').value = inst.name;
            document.getElementById('iWave').value = inst.wave.charAt(0).toUpperCase() + inst.wave.slice(1);
            document.getElementById('iFreqMode').value = inst.freqMode || 'relative';
            document.getElementById('iStart').value = inst.startFreq || 440;
            document.getElementById('iEnd').value = inst.endFreq || 440;
            document.getElementById('iStartVol').value = inst.startVol !== undefined ? inst.startVol : 255;
            document.getElementById('iEndVol').value = inst.endVol !== undefined ? inst.endVol : 0;
            document.getElementById('iEffect').value = inst.effect || 'None';
            updateVal('start');
            updateVal('end');
            updateVal('startVol');
            updateVal('endVol');
        } else {
            document.getElementById('iName').value = '';
            document.getElementById('iWave').value = 'Square';
            document.getElementById('iFreqMode').value = 'relative';
            document.getElementById('iStart').value = 440;
            document.getElementById('iEnd').value = 440;
            document.getElementById('iStartVol').value = 255;
            document.getElementById('iEndVol').value = 0;
            document.getElementById('iEffect').value = 'None';
            updateVal('start');
            updateVal('end');
            updateVal('startVol');
            updateVal('endVol');
        }
        
        updateFreqGroups();
        closeModal('instMgrModal');
        openModal('instModal');
    }
    
    function updateFreqGroups() {
        const mode = document.getElementById('iFreqMode').value;
        document.getElementById('freqGroup').style.display = mode === 'fixed' ? 'block' : 'none';
        document.getElementById('freqEndGroup').style.display = mode === 'fixed' ? 'block' : 'none';
    }
    
    document.getElementById('iFreqMode').addEventListener('change', updateFreqGroups);
    
    function deleteInst(id) {
        if (!confirm('Delete this instrument?')) return;
        delete insts[id];
        if (selInst === id) selInst = 'square';
        pattern.forEach(row => row.forEach((cell, i) => {
            if (cell && cell.inst === id) row[i] = null;
        }));
        initInstMgr();
        initInsts();
        initGrid();
    }
    
    function setSteps() {
        const newRows = parseInt(document.getElementById('stepCount').value);
        
        if (isNaN(newRows) || newRows < 1 || newRows > 256) {
            alert('Steps must be between 1 and 256');
            document.getElementById('stepCount').value = ROWS;
            return;
        }
        
        if (newRows === ROWS) {
            return;
        }
        
        const newPattern = [];
        for (let i = 0; i < newRows; i++) {
            newPattern.push([null, null, null, null, null, null]);
        }
        
        for (let i = 0; i < Math.min(ROWS, newRows); i++) {
            for (let j = 0; j < CHANNELS; j++) {
                newPattern[i][j] = pattern[i][j];
            }
        }
        
        pattern = newPattern;
        ROWS = newRows;
        initGrid();
    }
    
    function initGrid() {
        const g = document.getElementById('grid');
        g.innerHTML = '<div class="header-cell">Step</div>';
        for (let i = 1; i <= CHANNELS; i++) {
            g.innerHTML += `<div class="header-cell">CH${i}</div>`;
        }
        
        for (let r = 0; r < ROWS; r++) {
            const s = document.createElement('div');
            s.className = 'step-number';
            if (r % beatsPerMeasure === 0) {
                s.classList.add('measure-start');
            }
            s.textContent = (r+1).toString().padStart(2,'0');
            g.appendChild(s);
            
            for (let c = 0; c < CHANNELS; c++) {
                const cell = document.createElement('div');
                cell.className = 'note-cell';
                cell.dataset.row = r;
                cell.dataset.col = c;
                const n = pattern[r][c];
                if (n) {
                    const i = insts[n.inst] || insts['square'];
                    const noteDisplay = typeof n.note === 'number' ? n.note+'Hz' : n.note;
                    const lengthDisplay = n.length > 1 ? ` (${n.length})` : '';
                    cell.textContent = noteDisplay+lengthDisplay+'\n'+i.name;
                    cell.classList.add('active');
                    cell.style.backgroundColor = i.color;
                    cell.style.borderColor = i.text;
                    cell.style.color = i.text;
                } else {
                    cell.textContent = '---';
                }
                
                cell.onmousedown = (e) => handleCellMouseDown(e, r, c);
                cell.onmouseenter = (e) => handleCellMouseEnter(e, r, c);
                cell.onmouseup = () => handleCellMouseUp();
                
                g.appendChild(cell);
            }
        }
        
        if (pasteMode) {
            updatePastePreview();
        }
    }
    
    function handleCellMouseDown(e, r, c) {
        const key = `${r},${c}`;
        
        if (pasteMode) {
            return;
        }
        
        if (selectMode) {
            if (selectedCells.has(key)) {
                isDraggingNotes = true;
                dragOrigin = {row: r, col: c};
                
                draggedNotes = Array.from(selectedCells).map(cellKey => {
                    const [row, col] = cellKey.split(',').map(Number);
                    return {
                        row: row,
                        col: col,
                        note: pattern[row][col] ? {...pattern[row][col]} : null
                    };
                }).filter(n => n.note);
                
                const minRow = Math.min(...draggedNotes.map(n => n.row));
                const minCol = Math.min(...draggedNotes.map(n => n.col));
                draggedNotes = draggedNotes.map(n => ({
                    ...n,
                    relRow: n.row - minRow,
                    relCol: n.col - minCol
                }));
            } else {
                if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
                    selectedCells.clear();
                }
                dragStart = {row: r, col: c};
                if (selectedCells.has(key)) {
                    selectedCells.delete(key);
                } else {
                    selectedCells.add(key);
                }
                updateSelection();
            }
        } else if (eraseMode) {
            pattern[r][c] = null;
            initGrid();
        } else if (selNote && selInst) {
            pattern[r][c] = {note:selNote,inst:selInst,length:selNoteLength};
            const i = insts[selInst];
            const baseFreq = typeof selNote === 'number' ? selNote : notes[selNote];
            playNotePreview(baseFreq, i);
            initGrid();
        }
    }
    
    function handleCellMouseEnter(e, r, c) {
        if (pasteMode) {
            pasteOffset = {row: r, col: c};
            updatePastePreview();
            return;
        }
        
        if (isDraggingNotes && e.buttons === 1 && !pasteMode) {
            updateDragPreview(r, c);
        } else if (dragStart && selectMode && e.buttons === 1 && !isDraggingNotes) {
            const minR = Math.min(dragStart.row, r);
            const maxR = Math.max(dragStart.row, r);
            const minC = Math.min(dragStart.col, c);
            const maxC = Math.max(dragStart.col, c);
            
            selectedCells.clear();
            for (let i = minR; i <= maxR; i++) {
                for (let j = minC; j <= maxC; j++) {
                    selectedCells.add(`${i},${j}`);
                }
            }
            updateSelection();
        }
    }
    
    function handleCellMouseUp() {
        if (isDraggingNotes && !pasteMode) {
            placeDraggedNotes();
        }
        dragStart = null;
        if (!pasteMode) {
            isDraggingNotes = false;
        }
    }
    
    function updateDragPreview(targetRow, targetCol) {
        document.querySelectorAll('.note-cell').forEach(cell => {
            cell.classList.remove('drag-preview');
        });
        
        draggedNotes.forEach(({relRow, relCol}) => {
            const newRow = targetRow + relRow;
            const newCol = targetCol + relCol;
            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < CHANNELS) {
                const cell = document.querySelector(`.note-cell[data-row="${newRow}"][data-col="${newCol}"]`);
                if (cell) {
                    cell.classList.add('drag-preview');
                }
            }
        });
    }
    
    function placeDraggedNotes() {
        const previewCells = document.querySelectorAll('.note-cell.drag-preview');
        if (previewCells.length === 0) return;
        
        const firstPreview = previewCells[0];
        const targetRow = parseInt(firstPreview.dataset.row);
        const targetCol = parseInt(firstPreview.dataset.col);
        
        draggedNotes.forEach(({row, col}) => {
            pattern[row][col] = null;
        });
        
        draggedNotes.forEach(({note, relRow, relCol}) => {
            const newRow = targetRow + relRow;
            const newCol = targetCol + relCol;
            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < CHANNELS) {
                pattern[newRow][newCol] = note ? {...note} : null;
            }
        });
        
        selectedCells.clear();
        draggedNotes.forEach(({relRow, relCol}) => {
            const newRow = targetRow + relRow;
            const newCol = targetCol + relCol;
            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < CHANNELS) {
                selectedCells.add(`${newRow},${newCol}`);
            }
        });
        
        draggedNotes = [];
        initGrid();
    }
    
    function updateSelection() {
        document.querySelectorAll('.note-cell').forEach(cell => {
            const key = `${cell.dataset.row},${cell.dataset.col}`;
            if (selectedCells.has(key)) {
                cell.classList.add('selected');
            } else {
                cell.classList.remove('selected');
            }
        });
        document.getElementById('copyBtn').disabled = selectedCells.size === 0;
        updateStatusBar();
    }
    
    function updateStatusBar() {
        const statusText = document.getElementById('statusText');
        const selectionCount = document.getElementById('selectionCount');
        
        if (playing) {
            statusText.textContent = 'Playing';
        } else if (pasteMode) {
            statusText.textContent = 'Pasting (enter to place notes)';
        } else if (isDraggingNotes) {
            statusText.textContent = 'Dragging';
        } else if (selectMode) {
            statusText.textContent = 'Selecting';
        } else if (eraseMode) {
            statusText.textContent = 'Erasing';
        } else if (drawMode) {
            statusText.textContent = 'Drawing';
        } else {
            statusText.textContent = 'Ready';
        }
        
        if (selectedCells.size > 0) {
            selectionCount.textContent = `${selectedCells.size} note${selectedCells.size === 1 ? '' : 's'} selected`;
        } else {
            selectionCount.textContent = '';
        }
    }
    
    function copySelection() {
        if (selectedCells.size === 0) return;
        
        const cells = Array.from(selectedCells).map(key => {
            const [r, c] = key.split(',').map(Number);
            return {row: r, col: c, note: pattern[r][c]};
        });
        
        const minRow = Math.min(...cells.map(c => c.row));
        const minCol = Math.min(...cells.map(c => c.col));
        
        copiedOrigin = {row: minRow, col: minCol};
        
        copiedNotes = cells.map(c => ({
            row: c.row - minRow,
            col: c.col - minCol,
            note: c.note ? JSON.parse(JSON.stringify(c.note)) : null
        })).filter(c => c.note);
        
        document.getElementById('pasteBtn').disabled = false;
        updateStatusBar();
    }
    
    function cutSelection() {
        copySelection();
        selectedCells.forEach(key => {
            const [r, c] = key.split(',').map(Number);
            pattern[r][c] = null;
        });
        selectedCells.clear();
        initGrid();
    }
    
    function deleteSelection() {
        selectedCells.forEach(key => {
            const [r, c] = key.split(',').map(Number);
            pattern[r][c] = null;
        });
        selectedCells.clear();
        initGrid();
    }
    
    function startPaste() {
        if (copiedNotes.length === 0) return;
        
        selectMode = true;
        drawMode = false;
        eraseMode = false;
        pasteMode = true;
        
        if (copiedOrigin) {
            pasteOffset = {row: copiedOrigin.row, col: copiedOrigin.col};
        } else {
            pasteOffset = {row: 0, col: 0};
        }
        
        selectedCells.clear();
        updateModeButtons();
        updateSelection();
        initGrid();
    }
    
    function updatePastePreview() {
        document.querySelectorAll('.note-cell').forEach(cell => {
            cell.classList.remove('paste-preview');
        });
        
        if (!pasteMode) return;
        
        pastePreviewCells = [];
        
        copiedNotes.forEach(({row, col, note}) => {
            const targetRow = row + pasteOffset.row;
            const targetCol = col + pasteOffset.col;
            if (targetRow >= 0 && targetRow < ROWS && targetCol >= 0 && targetCol < CHANNELS) {
                const cell = document.querySelector(`.note-cell[data-row="${targetRow}"][data-col="${targetCol}"]`);
                if (cell && note) {
                    cell.classList.add('paste-preview');
                    pastePreviewCells.push({row: targetRow, col: targetCol, note: {...note}});
                }
            }
        });
    }
    
    function placePastedNotes() {
        if (!pasteMode) return;
        
        copiedNotes.forEach(({row, col, note}) => {
            const targetRow = row + pasteOffset.row;
            const targetCol = col + pasteOffset.col;
            if (targetRow >= 0 && targetRow < ROWS && targetCol >= 0 && targetCol < CHANNELS && note) {
                pattern[targetRow][targetCol] = JSON.parse(JSON.stringify(note));
            }
        });
        
        selectedCells.clear();
        copiedNotes.forEach(({row, col}) => {
            const targetRow = row + pasteOffset.row;
            const targetCol = col + pasteOffset.col;
            if (targetRow >= 0 && targetRow < ROWS && targetCol >= 0 && targetCol < CHANNELS) {
                selectedCells.add(`${targetRow},${targetCol}`);
            }
        });
        
        pasteMode = false;
        initGrid();
    }
    
    function cancelPaste() {
        pasteMode = false;
        initGrid();
    }
    
    function updateModeButtons() {
        document.getElementById('drawBtn').classList.toggle('active', drawMode);
        document.getElementById('selectBtn').classList.toggle('active', selectMode);
        document.getElementById('eraseBtn').classList.toggle('active', eraseMode);
        document.getElementById('playBtn').classList.toggle('active', playing);
        updateStatusBar();
    }
    
    function initNotes() {
        const g = document.getElementById('noteGrid');
        g.innerHTML = '';
        
        const modeSwitch = document.createElement('div');
        modeSwitch.style.cssText = 'grid-column:1/-1;padding:12px;text-align:center;background:#1a1a1a;border-radius:4px;margin-bottom:8px;display:flex;gap:8px;justify-content:center';
        
        const pianoBtn = document.createElement('button');
        pianoBtn.textContent = 'Piano Notes';
        pianoBtn.style.flex = '1';
        pianoBtn.onclick = (e) => { 
            e.stopPropagation();
            noteMode = 'piano'; 
            initNotes(); 
        };
        if (noteMode === 'piano') pianoBtn.style.background = '#3a3a3a';
        
        const freqBtn = document.createElement('button');
        freqBtn.textContent = 'Frequency';
        freqBtn.style.flex = '1';
        freqBtn.onclick = (e) => { 
            e.stopPropagation();
            noteMode = 'freq'; 
            initNotes(); 
        };
        if (noteMode === 'freq') freqBtn.style.background = '#3a3a3a';
        
        modeSwitch.appendChild(pianoBtn);
        modeSwitch.appendChild(freqBtn);
        g.appendChild(modeSwitch);
        
        const noteList = noteMode === 'piano' ? Object.keys(notes) : freqOptions;
        
        noteList.forEach(n => {
            const d = document.createElement('div');
            d.className = 'note-item';
            d.textContent = noteMode === 'piano' ? n : n+'Hz';
            d.onclick = (e) => { 
                e.stopPropagation();
                selNote = n;
                eraseMode = false;
                const i = insts[selInst];
                const baseFreq = typeof n === 'number' ? n : notes[n];
                playNotePreview(baseFreq, i);
            };
            g.appendChild(d);
        });
    }
    
    function initColors() {
        const g = document.getElementById('colors');
        g.innerHTML = '';
        colors.forEach(c => {
            const d = document.createElement('div');
            d.className = 'color-box';
            d.style.backgroundColor = c;
            d.onclick = () => {
                document.querySelectorAll('.color-box').forEach(e=>e.classList.remove('selected'));
                d.classList.add('selected');
            };
            g.appendChild(d);
        });
        g.firstChild.classList.add('selected');
    }
    
    function playNotePreview(baseFreq, inst) {
        const freqMode = inst.freqMode || 'relative';
        let startFreq, endFreq;
        
        if (freqMode === 'fixed') {
            startFreq = inst.startFreq || 440;
            endFreq = inst.endFreq || 440;
        } else {
            startFreq = baseFreq;
            endFreq = baseFreq;
        }
        
        playNote(startFreq, inst.wave, 0.3, startFreq, endFreq, inst.effect, inst.startVol, inst.endVol);
    }
    
    function playNote(freq, wave, dur, startFreq, endFreq, effect, startVol, endVol) {
        const g = ctx.createGain();
        g.connect(ctx.destination);
        
        const sVol = (startVol !== undefined ? startVol : 255) / 255 * 0.3;
        const eVol = (endVol !== undefined ? endVol : 0) / 255 * 0.3;
        
        g.gain.setValueAtTime(sVol, ctx.currentTime);
        if (eVol > 0.001) {
            g.gain.linearRampToValueAtTime(eVol, ctx.currentTime+dur);
        } else {
            g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime+dur);
        }
        
        if (wave === 'noise') {
            const buf = ctx.createBuffer(1, ctx.sampleRate*2, ctx.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = Math.random()*2-1;
            const src = ctx.createBufferSource();
            src.buffer = buf;
            src.connect(g);
            src.start();
            src.stop(ctx.currentTime+dur);
            oscs.push(src);
        } else {
            const osc = ctx.createOscillator();
            osc.type = wave;
            
            const start = startFreq || freq;
            const end = endFreq || freq;
            
            osc.frequency.setValueAtTime(start, ctx.currentTime);
            if (start !== end) {
                osc.frequency.linearRampToValueAtTime(end, ctx.currentTime+dur);
            }
            
            if (effect === 'Vibrato') {
                const lfo = ctx.createOscillator();
                const lfoGain = ctx.createGain();
                lfo.type = 'sine';
                lfo.frequency.value = 6;
                lfoGain.gain.value = 20;
                lfo.connect(lfoGain);
                lfoGain.connect(osc.frequency);
                lfo.start(ctx.currentTime);
                lfo.stop(ctx.currentTime + dur + 0.1);
                oscs.push(lfo);
            } else if (effect === 'Tremolo') {
                const lfo = ctx.createOscillator();
                const lfoGain = ctx.createGain();
                lfo.type = 'sine';
                lfo.frequency.value = 7;
                lfoGain.gain.value = 0.2;
                lfo.connect(lfoGain);
                lfoGain.connect(g.gain);
                lfo.start(ctx.currentTime);
                lfo.stop(ctx.currentTime + dur + 0.1);
                oscs.push(lfo);
            } else if (effect === 'Warble') {
                const lfo = ctx.createOscillator();
                const lfoGain = ctx.createGain();
                lfo.type = 'sine';
                lfo.frequency.value = 4;
                lfoGain.gain.value = 30;
                lfo.connect(lfoGain);
                lfoGain.connect(osc.frequency);
                lfo.start(ctx.currentTime);
                lfo.stop(ctx.currentTime + dur + 0.1);
                oscs.push(lfo);
            }
            
            osc.connect(g);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime+dur);
            oscs.push(osc);
        }
    }
    
    function playRow(r) {
        playingCells.forEach(cell => cell.classList.remove('playing'));
        playingCells = [];
        
        const bpm = parseInt(document.getElementById('bpm').value);
        const stepDur = (60/bpm);
        
        for (let c = 0; c < CHANNELS; c++) {
            const n = pattern[r][c];
            if (n) {
                const cell = document.querySelector(`.note-cell[data-row="${r}"][data-col="${c}"]`);
                if (cell) {
                    cell.classList.add('playing');
                    playingCells.push(cell);
                }
                
                const i = insts[n.inst] || insts['square'];
                const baseFreq = typeof n.note === 'number' ? n.note : notes[n.note];
                const noteLength = n.length || 1;
                const dur = stepDur * noteLength * 0.9;
                
                let startFreq, endFreq;
                const freqMode = i.freqMode || 'relative';
                
                if (freqMode === 'fixed') {
                    startFreq = i.startFreq || 440;
                    endFreq = i.endFreq || 440;
                } else {
                    startFreq = baseFreq;
                    endFreq = baseFreq;
                }
                
                playNote(startFreq, i.wave, dur, startFreq, endFreq, i.effect, i.startVol, i.endVol);
            }
        }
    }
    
    function play() {
        if (playing) return;
        playing = true;
        row = 0;
        const bpm = parseInt(document.getElementById('bpm').value);
        const msPerStep = (60/bpm)*1000;
        playRow(row);
        updateModeButtons();
        timer = setInterval(() => {
            row = (row+1)%ROWS;
            playRow(row);
        }, msPerStep);
    }
    
    function stop() {
        playing = false;
        clearInterval(timer);
        oscs.forEach(o => { try { o.stop(); } catch(e){} });
        oscs = [];
        playingCells.forEach(cell => cell.classList.remove('playing'));
        playingCells = [];
        updateModeButtons();
    }
    
    function demo() {
        ROWS = 8;
        document.getElementById('stepCount').value = 8;
        document.getElementById('bpm').value = 150;
        beatsPerMeasure = 4;
        document.getElementById('beatsPerMeasure').value = 4;
        
        pattern = [];
        for (let i = 0; i < ROWS; i++) {
            pattern.push([null, null, null, null, null, null]);
        }
        
        insts['melody'] = {
            name:'Melody',wave:'square',color:'#4a1a1a',text:'#ff6666',
            freqMode:'relative',
            startVol:255,endVol:0,effect:'None',custom:true
        };
        
        insts['sine_bass'] = {
            name:'SineBass',wave:'sine',color:'#0a0a2a',text:'#6666ff',
            freqMode:'fixed',startFreq:50,endFreq:50,
            startVol:255,endVol:0,effect:'None',custom:true
        };
        
        insts['saw_bass'] = {
            name:'SawBass',wave:'sawtooth',color:'#1a2a1a',text:'#66ff66',
            freqMode:'fixed',startFreq:65,endFreq:65,
            startVol:255,endVol:0,effect:'None',custom:true
        };
        
        insts['saw_bass2'] = {
            name:'SawBass2',wave:'sawtooth',color:'#2a1a1a',text:'#66ff99',
            freqMode:'fixed',startFreq:69,endFreq:69,
            startVol:255,endVol:0,effect:'None',custom:true
        };
        
        insts['perc'] = {
            name:'Perc',wave:'noise',color:'#1a1a1a',text:'#aaaaaa',
            freqMode:'relative',
            startVol:255,endVol:0,effect:'None',custom:true
        };
        
        pattern[0][0] = {note:'C4',inst:'melody',length:1};
        pattern[0][1] = {note:50,inst:'sine_bass',length:1};
        pattern[0][2] = {note:50,inst:'sine_bass',length:1};
        pattern[0][3] = {note:50,inst:'sine_bass',length:1};
        pattern[0][4] = {note:65,inst:'saw_bass',length:1};
        
        pattern[1][0] = {note:'C4',inst:'melody',length:1};
        pattern[1][1] = {note:50,inst:'sine_bass',length:1};
        pattern[1][2] = {note:50,inst:'sine_bass',length:1};
        pattern[1][3] = {note:50,inst:'sine_bass',length:1};
        pattern[1][4] = {note:65,inst:'saw_bass',length:1};
        
        pattern[2][0] = {note:'C4',inst:'melody',length:1};
        pattern[2][1] = {note:'C4',inst:'perc',length:1};
        
        pattern[3][0] = {note:'C4',inst:'melody',length:1};
        pattern[3][1] = {note:69,inst:'saw_bass2',length:1};
        pattern[3][2] = {note:69,inst:'saw_bass2',length:1};
        
        pattern[4][0] = {note:'C4',inst:'melody',length:1};
        pattern[4][1] = {note:50,inst:'sine_bass',length:1};
        pattern[4][2] = {note:50,inst:'sine_bass',length:1};
        pattern[4][3] = {note:50,inst:'sine_bass',length:1};
        pattern[4][4] = {note:65,inst:'saw_bass',length:1};
        
        pattern[5][0] = {note:'C4',inst:'melody',length:1};
        pattern[5][1] = {note:'C4',inst:'perc',length:1};
        
        pattern[6][0] = {note:'C4',inst:'melody',length:1};
        pattern[6][1] = {note:69,inst:'saw_bass2',length:1};
        pattern[6][2] = {note:69,inst:'saw_bass2',length:1};
        
        pattern[7][0] = {note:'C#4',inst:'melody',length:1};
        
        initInsts();
        initGrid();
    }
    
    function preview() {
        const f1 = parseInt(document.getElementById('iStart').value);
        const f2 = parseInt(document.getElementById('iEnd').value);
        const w = document.getElementById('iWave').value.toLowerCase();
        const ef = document.getElementById('iEffect').value;
        const sVol = parseInt(document.getElementById('iStartVol').value);
        const eVol = parseInt(document.getElementById('iEndVol').value);
        playNote(f1, w, 0.5, f1, f2, ef, sVol, eVol);
    }
    
    function saveInst() {
        const name = document.getElementById('iName').value || 'Custom';
        const wave = document.getElementById('iWave').value.toLowerCase();
        const freqMode = document.getElementById('iFreqMode').value;
        const start = parseInt(document.getElementById('iStart').value);
        const end = parseInt(document.getElementById('iEnd').value);
        const effect = document.getElementById('iEffect').value;
        const col = document.querySelector('.color-box.selected').style.backgroundColor;
        const startVol = parseInt(document.getElementById('iStartVol').value);
        const endVol = parseInt(document.getElementById('iEndVol').value);
        
        const id = editingInstId || 'custom_'+Date.now();
        insts[id] = {
            name,wave,color:col,text:'#e8e8e8',
            freqMode,
            startFreq: freqMode === 'fixed' ? start : undefined,
            endFreq: freqMode === 'fixed' ? end : undefined,
            effect,startVol,endVol,
            custom: !editingInstId || insts[editingInstId]?.custom
        };
        
        selInst = id;
        initInsts();
        closeModal('instModal');
        openModal('instMgrModal');
        initInstMgr();
    }
    
    function parseImportCode() {
        const code = document.getElementById('importCode').value.trim();
        
        if (!code) {
            alert('Please paste extension code first!');
            return;
        }
        
        if (!code.includes('namespace utmMusic') && !code.includes('namespace UTMMusic')) {
            alert('This doesn\'t look like a utmMusic extension.');
            return;
        }
        
        // Extract song names from enum
        const enumMatch = code.match(/enum\s+UTMSong\s*\{([\s\S]*?)\}/);
        if (!enumMatch) {
            alert('Could not find UTMSong enum in the code.');
            return;
        }
        
        const enumContent = enumMatch[1];
        const songNames = [];
        const enumLines = enumContent.split('\n');
        
        for (const line of enumLines) {
            const match = line.match(/([A-Z_][A-Z0-9_]*)/);
            if (match && !line.includes('block=')) {
                songNames.push(match[1]);
            }
        }
        
        if (songNames.length === 0) {
            alert('No songs found in the extension.');
            return;
        }
        
        // Display song list
        const listEl = document.getElementById('importSongList');
        listEl.innerHTML = '<h3 style="margin-bottom:12px">Found Songs:</h3>';
        
        songNames.forEach(songName => {
            const btn = document.createElement('button');
            btn.textContent = `Import ${songName}`;
            btn.style.width = '100%';
            btn.style.marginBottom = '8px';
            btn.onclick = () => importSongFromCode(code, songName);
            listEl.appendChild(btn);
        });
    }
    
    function importSongFromCode(code, songName) {
        // Extract the case block for this song
        const caseRegex = new RegExp(`case\\s+UTMSong\\.${songName}:[\\s\\S]*?return\\s*\\{([\\s\\S]*?)\\};`, 'i');
        const caseMatch = code.match(caseRegex);
        
        if (!caseMatch) {
            alert(`Could not find data for song ${songName}`);
            return;
        }
        
        const caseContent = caseMatch[1];
        
        // Extract stepMs (BPM)
        const stepMsMatch = caseContent.match(/stepMs:\s*(\d+)/);
        if (!stepMsMatch) {
            alert('Could not extract BPM data');
            return;
        }
        const stepMs = parseInt(stepMsMatch[1]);
        const bpm = Math.round(60000 / stepMs);
        
        // Extract arrays
        function extractArray(name) {
            const regex = new RegExp(`${name}:\\s*\\[([^\\]]+)\\]`);
            const match = caseContent.match(regex);
            if (!match) return [];
            return match[1].split(',').map(s => s.trim());
        }
        
        const sfxWave = extractArray('sfxWave');
        const sfxStartFreq = extractArray('sfxStartFreq').map(Number);
        const sfxEndFreq = extractArray('sfxEndFreq').map(Number);
        const sfxStartVol = extractArray('sfxStartVol').map(Number);
        const sfxEndVol = extractArray('sfxEndVol').map(Number);
        const sfxDuration = extractArray('sfxDuration').map(Number);
        const sfxEffect = extractArray('sfxEffect');
        
        // Extract hex data
        const hexMatch = caseContent.match(/data:\s*hex`([^`]+)`/);
        if (!hexMatch) {
            alert('Could not extract song data');
            return;
        }
        
        const hexStr = hexMatch[1].replace(/\s/g, '');
        const bytes = [];
        for (let i = 0; i < hexStr.length; i += 2) {
            bytes.push(parseInt(hexStr.substr(i, 2), 16));
        }
        
        // Parse byte data back into pattern
        const newPattern = [];
        let i = 0;
        while (i < bytes.length) {
            const count = bytes[i++];
            const stepNotes = [];
            for (let j = 0; j < count; j++) {
                const sfxId = bytes[i++];
                stepNotes.push(sfxId);
            }
            newPattern.push(stepNotes);
        }
        
        // Convert SFX IDs back to note objects
        const waveMap = {
            'WaveShape.Sine': 'sine',
            'WaveShape.Square': 'square',
            'WaveShape.Sawtooth': 'sawtooth',
            'WaveShape.Triangle': 'triangle',
            'WaveShape.Noise': 'noise'
        };
        
        const effectMap = {
            'SoundExpressionEffect.None': 'None',
            'SoundExpressionEffect.Vibrato': 'Vibrato',
            'SoundExpressionEffect.Tremolo': 'Tremolo',
            'SoundExpressionEffect.Warble': 'Warble'
        };
        
        // Create instruments from SFX data
        const newInsts = {};
        for (let id = 0; id < sfxWave.length; id++) {
            const instId = `imported_${id}`;
            const wave = waveMap[sfxWave[id]] || 'square';
            const freqMode = (sfxStartFreq[id] === sfxEndFreq[id] && sfxStartFreq[id] < 300) ? 'fixed' : 'relative';
            
            newInsts[instId] = {
                name: `Inst${id}`,
                wave: wave,
                color: colors[id % colors.length],
                text: '#e8e8e8',
                freqMode: freqMode,
                startFreq: freqMode === 'fixed' ? sfxStartFreq[id] : undefined,
                endFreq: freqMode === 'fixed' ? sfxEndFreq[id] : undefined,
                startVol: sfxStartVol[id],
                endVol: sfxEndVol[id],
                effect: effectMap[sfxEffect[id]] || 'None',
                custom: true
            };
        }
        
        // Clear existing pattern and create new one
        ROWS = newPattern.length;
        document.getElementById('stepCount').value = ROWS;
        document.getElementById('bpm').value = bpm;
        document.getElementById('songName').value = songName.toLowerCase();
        
        pattern = [];
        for (let r = 0; r < ROWS; r++) {
            const row = [null, null, null, null, null, null];
            const stepSfx = newPattern[r];
            
            for (let c = 0; c < Math.min(stepSfx.length, CHANNELS); c++) {
                const sfxId = stepSfx[c];
                const inst = `imported_${sfxId}`;
                const freq = sfxStartFreq[sfxId];
                
                // Find closest note or use frequency
                let note = freq;
                if (newInsts[inst].freqMode === 'relative') {
                    let closestNote = 'C4';
                    let closestDiff = Math.abs(notes['C4'] - freq);
                    for (const [noteName, noteFreq] of Object.entries(notes)) {
                        const diff = Math.abs(noteFreq - freq);
                        if (diff < closestDiff) {
                            closestDiff = diff;
                            closestNote = noteName;
                        }
                    }
                    note = closestNote;
                }
                
                const length = Math.round(sfxDuration[sfxId] / stepMs);
                row[c] = {note: note, inst: inst, length: length || 1};
            }
            
            pattern.push(row);
        }
        
        // Merge new instruments
        Object.assign(insts, newInsts);
        
        // Update UI
        initInsts();
        initGrid();
        closeModal('importModal');
        
        alert(`Successfully imported song "${songName}"!`);
    }
    
    function exportCode() {
        const name = document.getElementById('songName').value.replace(/[^a-zA-Z0-9_]/g,'') || 'mySong';
        const songData = generateSongData();
        
        if (!songData) {
            alert('Error generating song data!');
            return;
        }
        
        let code;
        
        if (exportMode === 'sequencer') {
            // Sequencer mode - new instrument-based system
            code = generateSequencerExport(name, songData);
        } else {
            // Legacy UTMF mode
            code = generateLegacyExport(name, songData);
        }
        
        document.getElementById('code').textContent = code;
        openModal('exportModal');
    }
    
    function generateLegacyExport(name, songData) {
        return `// COMPLETE UTMF EXTENSION CODE - Ready to use!
```

// Copy this entire code and paste it as a new extension in MakeCode Arcade

namespace utmMusic {
export enum UTMSong {
//% block=”${name}”
${name.toUpperCase()}
}

```
export function playSong(song: UTMSong, loop: boolean = false) {
    const data = getSongData(song);
    if (!data) return;
    
    const sfx: music.SoundEffect[] = [];
    for (let i = 0; i < data.sfxWave.length; i++) {
        const sound = music.createSoundEffect(
            data.sfxWave[i],
            data.sfxStartFreq[i],
            data.sfxEndFreq[i],
            data.sfxStartVol[i],
            data.sfxEndVol[i],
            data.sfxDuration[i],
            data.sfxEffect[i],
            data.sfxCurve[i]
        );
        sfx.push(sound);
    }

    control.runInParallel(() => {
        do {
            let idx = 0;
            while (idx < data.data.length) {
                const count = data.data[idx++];
                const startTime = game.runtime();
                
                for (let i = 0; i < count; i++) {
                    const sfxId = data.data[idx++];
                    control.runInParallel(() => {
                        sfx[sfxId].play();
                    });
                }
                
                const elapsed = game.runtime() - startTime;
                const waitTime = data.stepMs - elapsed;
                if (waitTime > 0) pause(waitTime);
            }
        } while (loop);
    });
}

function getSongData(song: UTMSong) {
    switch (song) {
        case UTMSong.${name.toUpperCase()}:
            return {
                stepMs: ${songData.stepMs},
                sfxWave: [${songData.sfxWave}],
                sfxStartFreq: [${songData.sfxStartFreq}],
                sfxEndFreq: [${songData.sfxEndFreq}],
                sfxStartVol: [${songData.sfxStartVol}],
                sfxEndVol: [${songData.sfxEndVol}],
                sfxDuration: [${songData.sfxDuration}],
                sfxEffect: [${songData.sfxEffect}],
                sfxCurve: [${songData.sfxCurve}],
                data: hex\`${songData.hexStr}\`
            };
        default:
            return null;
    }
}
```

}

// USAGE: utmMusic.playSong(utmMusic.UTMSong.${name.toUpperCase()}, true)
// Stats: ${songData.sfxCount} instruments, ${ROWS} steps, ${songData.dataSize} bytes`;
}

```
    function generateSequencerExport(name, songData) {
        // Generate instrument definitions
        const instDefs = [];
        Object.entries(insts).forEach(([id, inst]) => {
            if (inst.custom || ['sine','square','sawtooth','triangle','noise'].includes(id)) {
                instDefs.push(`{
    name: "${inst.name}",
    wave: WaveShape.${inst.wave.charAt(0).toUpperCase() + inst.wave.slice(1)},
    freqMode: "${inst.freqMode || 'relative'}",
    ${inst.freqMode === 'fixed' ? `startFreq: ${inst.startFreq || 440},
    endFreq: ${inst.endFreq || 440},` : ''}
    startVol: ${inst.startVol !== undefined ? inst.startVol : 255},
    endVol: ${inst.endVol !== undefined ? inst.endVol : 0},
    effect: SoundExpressionEffect.${inst.effect || 'None'}
}`);
            }
        });
        
        return `// Add this to your utmMusic extension (Sequencer Mode)
```

// 1. Add this enum entry to your UTMSong enum:
enum UTMSong {
//% block=”${name}”
${name.toUpperCase()}
}

// 2. Add these instrument definitions:
const ${name}_instruments = [
${instDefs.join(’,\n’)}
];

// 3. Add this case to getSongData():
case UTMSong.${name.toUpperCase()}:
return {
stepMs: ${songData.stepMs},
instruments: ${name}_instruments,
pattern: ${JSON.stringify(pattern, null, 4).replace(/”([^”]+)”:/g, ‘$1:’)}
};

// This sequencer-based format allows easier editing of individual notes
// and better represents the tracker’s structure.`;
}

```
    function generateSongData() {
        const name = document.getElementById('songName').value.replace(/[^a-zA-Z0-9_]/g,'') || 'mySong';
        const bpm = parseInt(document.getElementById('bpm').value);
        const STEP_MS = Math.round(60000/bpm);
        
        const waveShapeMap = {
            sine: 'WaveShape.Sine',
            square: 'WaveShape.Square',
            sawtooth: 'WaveShape.Sawtooth',
            triangle: 'WaveShape.Triangle',
            noise: 'WaveShape.Noise'
        };
        
        const effectMap = {
            None: 'SoundExpressionEffect.None',
            Vibrato: 'SoundExpressionEffect.Vibrato',
            Tremolo: 'SoundExpressionEffect.Tremolo',
            Warble: 'SoundExpressionEffect.Warble'
        };
        
        const steps = [];
        for (let r = 0; r < ROWS; r++) {
            const stepSfx = [];
            for (let c = 0; c < CHANNELS; c++) {
                const n = pattern[r][c];
                if (n) {
                    const i = insts[n.inst] || insts['square'];
                    const baseFreq = typeof n.note === 'number' ? n.note : notes[n.note];
                    
                    let sf, ef;
                    const freqMode = i.freqMode || 'relative';
                    
                    if (freqMode === 'fixed') {
                        sf = i.startFreq || 440;
                        ef = i.endFreq || 440;
                    } else {
                        sf = baseFreq;
                        ef = baseFreq;
                    }
                    
                    const sVol = i.startVol !== undefined ? i.startVol : 255;
                    const eVol = i.endVol !== undefined ? i.endVol : 0;
                    const dur = STEP_MS * (n.length || 1);
                    
                    stepSfx.push({
                        wave: waveShapeMap[i.wave],
                        sf: sf,
                        ef: ef,
                        sv: sVol,
                        ev: eVol,
                        dur: dur,
                        fx: effectMap[i.effect || 'None'],
                        curve: 'InterpolationCurve.Linear'
                    });
                }
            }
            steps.push(stepSfx);
        }
        
        const sfxMap = new Map();
        const sfxList = [];
        
        function sfxKey(p) {
            return `${p.wave}:${p.sf}:${p.ef}:${p.sv}:${p.ev}:${p.dur}:${p.fx}:${p.curve}`;
        }
        
        function getSfxId(p) {
            const key = sfxKey(p);
            const existing = sfxMap.get(key);
            if (existing !== undefined) return existing;
            
            const id = sfxList.length;
            sfxList.push(p);
            sfxMap.set(key, id);
            return id;
        }
        
        const bytes = [];
        for (const step of steps) {
            const count = step.length;
            bytes.push(count);
            for (const p of step) {
                const id = getSfxId(p);
                bytes.push(id);
            }
        }
        
        let hexStr = '';
        for (let i = 0; i < bytes.length; i++) {
            hexStr += bytes[i].toString(16).padStart(2, '0');
            if ((i + 1) % 16 === 0 && i < bytes.length - 1) {
                hexStr += '\n            ';
            } else if (i < bytes.length - 1) {
                hexStr += ' ';
            }
        }
        
        return {
            stepMs: STEP_MS,
            sfxWave: sfxList.map(s => s.wave).join(', '),
            sfxStartFreq: sfxList.map(s => s.sf).join(', '),
            sfxEndFreq: sfxList.map(s => s.ef).join(', '),
            sfxStartVol: sfxList.map(s => s.sv).join(', '),
            sfxEndVol: sfxList.map(s => s.ev).join(', '),
            sfxDuration: sfxList.map(s => s.dur).join(', '),
            sfxEffect: sfxList.map(s => s.fx).join(', '),
            sfxCurve: sfxList.map(s => s.curve).join(', '),
            hexStr: hexStr,
            sfxCount: sfxList.length,
            totalSteps: ROWS,
            dataSize: bytes.length
        };
    }
    
    function copyCode() {
        navigator.clipboard.writeText(document.getElementById('code').textContent);
        alert('Instructions copied to clipboard!');
    }
    
    function mergeExtension() {
        const existingCode = document.getElementById('existingExtension').value.trim();
        
        if (!existingCode) {
            alert('Please paste your existing extension code first!');
            return;
        }
        
        if (!existingCode.includes('namespace utmMusic') && !existingCode.includes('namespace UTMMusic')) {
            alert('This doesn\'t look like a utmMusic extension. Make sure it contains "namespace utmMusic".');
            return;
        }
        
        const name = document.getElementById('songName').value.replace(/[^a-zA-Z0-9_]/g,'') || 'mySong';
        const songData = generateSongData();
        
        if (!songData) {
            alert('Error generating song data!');
            return;
        }
        
        let mergedCode = existingCode;
        
        // Step 1: Handle enum entries with better comma management
        const enumEntry = `    //% block="${name}"\n    ${name.toUpperCase()}`;
        
        const enumMatch = mergedCode.match(/(export\s+enum\s+UTMSong\s*\{)([\s\S]*?)(\n\s*\})/);
        if (enumMatch) {
            let existingEntries = enumMatch[2];
            
            // Check if song already exists
            if (existingEntries.includes(name.toUpperCase())) {
                if (!confirm(`Song "${name}" already exists in the enum. Replace it?`)) {
                    return;
                }
                // Remove existing entry
                const regex = new RegExp(`\\s*//.*\\n\\s*${name.toUpperCase()}[,]?\\s*`, 'g');
                existingEntries = existingEntries.replace(regex, '');
                mergedCode = mergedCode.replace(enumMatch[2], existingEntries);
            }
            
            // Clean up existing entries - ensure all have commas except the last
            existingEntries = existingEntries.trim();
            if (existingEntries) {
                // Remove trailing comma if present
                existingEntries = existingEntries.replace(/,\s*$/, '');
                // Add comma to the last entry
                existingEntries += ',';
            }
            
            // Add new entry
            const newEnum = enumMatch[1] + '\n' + existingEntries + '\n' + enumEntry + enumMatch[3];
            mergedCode = mergedCode.replace(/(export\s+enum\s+UTMSong\s*\{)([\s\S]*?)(\n\s*\})/, newEnum);
        } else {
            alert('Could not find UTMSong enum. Make sure your extension has the enum defined.');
            return;
        }
        
        // Step 2: Handle case statements
        const caseCode = `        case UTMSong.${name.toUpperCase()}:\n            return {\n                stepMs: ${songData.stepMs},\n                sfxWave: [${songData.sfxWave}],\n                sfxStartFreq: [${songData.sfxStartFreq}],\n                sfxEndFreq: [${songData.sfxEndFreq}],\n                sfxStartVol: [${songData.sfxStartVol}],\n                sfxEndVol: [${songData.sfxEndVol}],\n                sfxDuration: [${songData.sfxDuration}],\n                sfxEffect: [${songData.sfxEffect}],\n                sfxCurve: [${songData.sfxCurve}],\n                data: hex\`\n                    ${songData.hexStr}\n                \`\n            };`;
        
        // Remove existing case if it exists
        const caseRegex = new RegExp(`\\s*case\\s+UTMSong\\.${name.toUpperCase()}:[\\s\\S]*?(?=case\\s+UTMSong\\.|default:|\\n\\s*\\})`, 'g');
        mergedCode = mergedCode.replace(caseRegex, '');
        
        // Add new case before default
        const switchMatch = mergedCode.match(/(function\s+getSongData[\s\S]*?switch\s*\([^)]+\)\s*\{[\s\S]*?)(default:)/);
        if (switchMatch) {
            mergedCode = mergedCode.replace(
                /(function\s+getSongData[\s\S]*?switch\s*\([^)]+\)\s*\{[\s\S]*?)(default:)/,
                `$1${caseCode}\n\n        $2`
            );
        } else {
            alert('Could not find getSongData switch statement. Make sure your extension has this function.');
            return;
        }
        
        document.getElementById('code').textContent = mergedCode;
        document.getElementById('existingExtension').value = '';
        
        alert(`Successfully merged song "${name}" into your extension!\n\nThe merged code is shown below. Copy it and replace your main.ts file.`);
    }
    
    function openModal(id) { document.getElementById(id).classList.add('active'); }
    function closeModal(id) { document.getElementById(id).classList.remove('active'); }
    
    document.getElementById('noteBtn').onclick = e => {
        const p = document.getElementById('notePopup');
        p.classList.toggle('active');
    };
    
    document.addEventListener('click', e => {
        if (!e.target.closest('#noteBtn') && !e.target.closest('#notePopup')) {
            document.getElementById('notePopup').classList.remove('active');
        }
    });
    
    document.getElementById('playBtn').onclick = play;
    document.getElementById('stopBtn').onclick = stop;
    document.getElementById('drawBtn').onclick = () => {
        drawMode = true;
        selectMode = false;
        eraseMode = false;
        pasteMode = false;
        updateModeButtons();
    };
    document.getElementById('selectBtn').onclick = () => {
        selectMode = !selectMode;
        if (selectMode) {
            drawMode = false;
            eraseMode = false;
            pasteMode = false;
        }
        updateModeButtons();
        initGrid();
    };
    document.getElementById('eraseBtn').onclick = () => { 
        eraseMode = !eraseMode;
        if (eraseMode) {
            drawMode = false;
            selectMode = false;
            pasteMode = false;
        }
        updateModeButtons();
        initGrid();
    };
    document.getElementById('copyBtn').onclick = copySelection;
    document.getElementById('pasteBtn').onclick = startPaste;
    document.getElementById('clearBtn').onclick = () => { 
        if (confirm('Clear all notes?')) {
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < CHANNELS; c++) {
                    pattern[r][c] = null;
                }
            }
            
            selectedCells.clear();
            copiedNotes = [];
            pasteMode = false;
            isDraggingNotes = false;
            pastePreviewCells = [];
            draggedNotes = [];
            dragStart = null;
            dragOrigin = null;
            
            updateSelection();
            updateStatusBar();
            initGrid(); 
        }
    };
    document.getElementById('demoBtn').onclick = demo;
    document.getElementById('shortcutBtn').onclick = () => openModal('shortcutModal');
    document.getElementById('setStepsBtn').onclick = setSteps;
    document.getElementById('instMgrBtn').onclick = () => { openModal('instMgrModal'); initInstMgr(); };
    document.getElementById('importBtn').onclick = () => openModal('importModal');
    document.getElementById('exportBtn').onclick = exportCode;
    document.getElementById('saveProjectBtn').onclick = saveProject;
    document.getElementById('loadProjectBtn').onclick = () => document.getElementById('fileInput').click();
    document.getElementById('fileInput').onchange = loadProject;
    document.getElementById('noteLength').addEventListener('input', (e) => {
        selNoteLength = parseInt(e.target.value) || 1;
    });
    document.getElementById('beatsPerMeasure').addEventListener('input', () => {
        beatsPerMeasure = parseInt(document.getElementById('beatsPerMeasure').value) || 4;
        initGrid();
    });
    document.getElementById('legacyModeBtn').onclick = () => {
        exportMode = 'legacy';
        updateExportMode();
    };
    document.getElementById('sequencerModeBtn').onclick = () => {
        exportMode = 'sequencer';
        updateExportMode();
    };
    
    function saveProject() {
        const projectData = {
            version: '1.3.0',
            songName: document.getElementById('songName').value,
            bpm: parseInt(document.getElementById('bpm').value),
            rows: ROWS,
            beatsPerMeasure: beatsPerMeasure,
            noteLength: selNoteLength,
            selectedInstrument: selInst,
            selectedNote: selNote,
            instruments: insts,
            pattern: pattern
        };
        
        const json = JSON.stringify(projectData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = (projectData.songName || 'song') + '.utmf';
        a.click();
        URL.revokeObjectURL(url);
    }
    
    function loadProject(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const projectData = JSON.parse(event.target.result);
                
                // Restore all settings
                document.getElementById('songName').value = projectData.songName || 'mySong';
                document.getElementById('bpm').value = projectData.bpm || 120;
                document.getElementById('stepCount').value = projectData.rows || 16;
                document.getElementById('beatsPerMeasure').value = projectData.beatsPerMeasure || 4;
                document.getElementById('noteLength').value = projectData.noteLength || 1;
                
                ROWS = projectData.rows || 16;
                beatsPerMeasure = projectData.beatsPerMeasure || 4;
                selNoteLength = projectData.noteLength || 1;
                selInst = projectData.selectedInstrument || 'square';
                selNote = projectData.selectedNote || 'C4';
                
                // Restore instruments
                insts = projectData.instruments || insts;
                
                // Restore pattern
                pattern = projectData.pattern || [];
                
                // Update UI
                initInsts();
                initGrid();
                
                alert('Project loaded successfully!');
            } catch (error) {
                alert('Error loading project: ' + error.message);
            }
        };
        reader.readAsText(file);
        
        // Reset file input
        e.target.value = '';
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        if (e.code === 'Space') {
            e.preventDefault();
            if (playing) stop(); else play();
        }
        
        if (e.code === 'KeyS' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            selectMode = !selectMode;
            if (selectMode) { drawMode = false; eraseMode = false; pasteMode = false; }
            updateModeButtons();
            initGrid();
        }
        
        if (e.code === 'KeyE' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            eraseMode = !eraseMode;
            if (eraseMode) { drawMode = false; selectMode = false; pasteMode = false; }
            updateModeButtons();
            initGrid();
        }
        
        if (e.code === 'KeyD' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            drawMode = true;
            selectMode = false;
            eraseMode = false;
            pasteMode = false;
            updateModeButtons();
            initGrid();
        }
        
        if ((e.ctrlKey || e.metaKey) && e.code === 'KeyC') {
            e.preventDefault();
            copySelection();
        }
        
        if ((e.ctrlKey || e.metaKey) && e.code === 'KeyV') {
            e.preventDefault();
            startPaste();
        }
        
        if ((e.ctrlKey || e.metaKey) && e.code === 'KeyX') {
            e.preventDefault();
            cutSelection();
        }
        
        if (e.code === 'Delete' || e.code === 'Backspace') {
            e.preventDefault();
            if (selectedCells.size > 0) {
                deleteSelection();
            }
        }
        
        if (e.code === 'Escape') {
            e.preventDefault();
            if (pasteMode) {
                cancelPaste();
            } else {
                selectedCells.clear();
                updateSelection();
            }
        }
        
        if (e.code === 'Enter' && pasteMode) {
            e.preventDefault();
            placePastedNotes();
        }
    });
    
    document.addEventListener('selectstart', (e) => {
        if (dragStart) e.preventDefault();
    });
    
    initInsts();
    initGrid();
    initNotes();
    initColors();
    updateModeButtons();
    updateExportMode();
</script>
```

</body>
</html>