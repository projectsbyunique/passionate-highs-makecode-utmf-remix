//% color="#ff0000" weight=100 icon="\uf025" block="UTM Music"
namespace utmMusic {

    // This enum starts empty. The tracker's auto-merge will
    // inject new entries like:
    //
    //   //% block="My Song"
    //   MY_SONG,
    //
    export enum UTMSong {
        //% block="newAgentSuspenceLoop"
        NEWAGENTSUSPENCELOOP,
        //% block="passionate highs"
        TESTFORPASH,
    }

    interface SongData {
        stepMs: number;
        sfxWave: WaveShape[];
        sfxStartFreq: number[];
        sfxEndFreq: number[];
        sfxStartVol: number[];
        sfxEndVol: number[];
        sfxDuration: number[];
        sfxEffect: SoundExpressionEffect[];
        sfxCurve: InterpolationCurve[];
        data: Buffer;
    }

    // The auto-merge script looks for this exact function + switch + default.
    // It will inject extra `case UTMSong.X:` blocks before the default.
    function getSongData(song: UTMSong): SongData {
        switch (song) {
            // (cases will be auto-added here by the tracker)

            case UTMSong.NEWAGENTSUSPENCELOOP:
                return {
                    stepMs: 200,
                    sfxWave: [WaveShape.Square, WaveShape.Sine, WaveShape.Sawtooth, WaveShape.Square, WaveShape.Noise, WaveShape.Sawtooth, WaveShape.Square],
                    sfxStartFreq: [262, 50, 65, 131, 262, 69, 277],
                    sfxEndFreq: [262, 50, 65, 131, 262, 69, 277],
                    sfxStartVol: [255, 255, 255, 255, 255, 255, 255],
                    sfxEndVol: [0, 0, 0, 0, 0, 0, 0],
                    sfxDuration: [200, 200, 200, 1600, 200, 200, 200],
                    sfxEffect: [SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None],
                    sfxCurve: [InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear],
                    data: hex`
                    06 00 01 01 01 02 03 05 00 01 01 01 02 02 00 04
                    03 00 05 05 04 01 01 01 02 03 00 04 00 03 00 05
                    05 01 06
                `
                };

            case UTMSong.TESTFORPASH:
                return {
                    stepMs: 261,
                    sfxWave: [WaveShape.Square, WaveShape.Square, WaveShape.Triangle, WaveShape.Sine, WaveShape.Square, WaveShape.Square, WaveShape.Square, WaveShape.Square, WaveShape.Square, WaveShape.Triangle, WaveShape.Square, WaveShape.Sine, WaveShape.Square, WaveShape.Square, WaveShape.Square, WaveShape.Square, WaveShape.Noise, WaveShape.Square, WaveShape.Square, WaveShape.Square, WaveShape.Square, WaveShape.Square, WaveShape.Square, WaveShape.Square],
                    sfxStartFreq: [65, 87, 85, 262, 131, 175, 104, 156, 196, 311, 69, 262, 139, 208, 78, 233, 311, 523, 415, 392, 466, 349, 622, 554],
                    sfxEndFreq: [65, 87, 67, 262, 131, 175, 104, 156, 196, 311, 69, 262, 139, 208, 78, 233, 311, 523, 415, 392, 466, 349, 622, 554],
                    sfxStartVol: [255, 255, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
                    sfxEndVol: [0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    sfxDuration: [522, 522, 522, 2349, 522, 522, 522, 522, 522, 261, 522, 2088, 522, 522, 522, 522, 261, 783, 783, 783, 783, 783, 783, 783],
                    sfxEffect: [SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None, SoundExpressionEffect.None],
                    sfxCurve: [InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear, InterpolationCurve.Linear],
                    data: hex`
                    04 00 01 02 03 04 04 05 06 01 02 04 02 04 04 05
                    06 01 02 00 02 04 04 07 08 00 02 00 02 06 04 07
                    08 00 09 09 03 0a 02 0b 04 0c 05 0d 0a 02 0a 02
                    04 0c 05 0d 0a 02 0e 02 04 07 08 0f 0e 02 0e 02
                    04 07 08 0f 0e 04 00 01 02 03 05 04 05 06 01 10
                    02 04 02 05 04 05 06 01 10 02 00 02 05 04 07 08
                    00 10 02 00 02 06 04 07 08 00 10 09 03 0a 02 0b
                    05 0c 05 0d 0a 10 02 0a 02 05 0c 05 0d 0a 10 02
                    0e 02 04 07 0f 0e 10 02 0e 02 05 07 08 0f 0e 10
                    04 00 01 02 10 06 04 05 06 01 10 11 03 04 02 10
                    06 04 05 06 01 10 12 03 00 02 10 06 04 07 08 00
                    10 13 03 00 02 10 05 04 07 08 00 10 03 0a 02 10
                    05 0c 05 0d 0a 10 03 0a 02 10 05 0c 05 0d 0a 10
                    03 0e 13 10 06 07 08 0f 0e 10 12 03 0e 14 10 06
                    07 08 0f 0e 10 11 04 00 01 02 10 06 04 05 06 01
                    10 11 03 04 02 10 06 04 05 06 01 10 12 03 00 02
                    10 06 04 07 08 00 10 13 03 00 02 10 05 04 07 08
                    00 10 03 0a 02 10 05 0c 05 0d 0a 10 03 0a 02 10
                    05 0c 05 0d 0a 10 03 0e 13 10 06 07 08 0f 0e 10
                    12 03 0e 13 10 06 07 08 0f 0e 10 15 04 00 01 02
                    10 06 04 05 06 01 10 11 03 04 02 10 06 04 05 06
                    01 10 12 03 00 02 10 06 04 07 08 00 10 13 03 00
                    02 10 05 04 07 08 00 10 03 0a 02 10 05 0c 05 0d
                    0a 10 03 0a 02 10 05 0c 05 0d 0a 10 03 0e 13 10
                    06 07 08 0f 0e 10 12 03 0e 14 10 06 07 08 0f 0e
                    10 11 04 00 01 02 10 06 04 05 06 01 10 11 03 04
                    02 10 06 04 05 06 01 10 12 03 00 02 10 06 04 07
                    08 00 10 13 03 00 02 10 05 04 07 08 00 10 03 0a
                    02 10 05 0c 05 0d 0a 10 03 0a 02 10 05 0c 05 0d
                    0a 10 03 0e 13 10 06 07 08 0f 0e 10 12 03 0e 13
                    10 06 07 08 0f 0e 10 15 04 00 01 02 10 06 04 05
                    06 01 10 16 03 04 02 10 06 04 05 06 01 10 17 03
                    00 02 10 06 04 07 08 00 10 14 03 00 02 10 06 04
                    07 08 00 10 11 03 0a 02 10 06 0c 05 0d 0a 10 16
                    03 0a 02 10 06 0c 05 0d 0a 10 17 03 0e 13 10 06
                    07 08 0f 0e 10 12 03 0e 14 10 06 07 08 0f 0e 10
                    11 04 00 01 02 10 06 04 05 06 01 10 16 03 04 02
                    10 06 04 05 06 01 10 17 03 00 02 10 06 04 07 08
                    00 10 14 03 00 02 10 06 04 07 08 00 10 11 03 0a
                    02 10 05 0c 05 0d 0a 10 03 0a 02 10 05 0c 05 0d
                    0a 10 03 0e 13 10 06 07 08 0f 0e 10 12 03 0e 13
                    10 06 07 08 0f 0e 10 15
                `
                };

            default:
                return null;
        }
    }

    function playSfx(songData: SongData, id: number) {
        const sfxCount = songData.sfxWave.length;
        if (id < 0 || id >= sfxCount) return;

        music.play(
            music.createSoundEffect(
                songData.sfxWave[id],
                songData.sfxStartFreq[id],
                songData.sfxEndFreq[id],
                songData.sfxStartVol[id],
                songData.sfxEndVol[id],
                songData.sfxDuration[id],
                songData.sfxEffect[id],
                songData.sfxCurve[id]
            ),
            music.PlaybackMode.InBackground
        );
    }

    function playSongData(songData: SongData) {
        let i = 0;
        const data = songData.data;
        while (i < data.length) {
            const count = data[i++];
            for (let j = 0; j < count; j++) {
                const sfxId = data[i++];
                playSfx(songData, sfxId);
            }
            pause(songData.stepMs);
        }
    }

    //% blockId=play_utm_song
    //% block="play UTM song %song"
    export function playSong(song: UTMSong) {
        const songData = getSongData(song);
        if (songData) {
            playSongData(songData);
        }
    }

    //% blockId=play_utm_song_loop
    //% block="play UTM song %song in loop"
    export function playSongLoop(song: UTMSong) {
        const songData = getSongData(song);
        if (songData) {
            forever(function () {
                playSongData(songData);
            });
        }
    }
}