// メインスクリプト: 紙芝居演出とフェード制御
document.addEventListener('DOMContentLoaded', function () {
    // 各セクションの表示時間（秒）。前のセクションより2秒ずつ長くする。
    const sequence = [
        { id: 'risk', duration: 6 },
        { id: 'solution', duration: 8 },
        { id: 'gallery', duration: 10 },
        { id: 'specs', duration: 12 },
        { id: 'contact', duration: 14 }
    ];

    // 最初は全てのセクションを非表示にしておく
    sequence.forEach(item => {
        const el = document.getElementById(item.id);
        if (el) {
            el.style.display = 'none';
            el.style.opacity = '0';
        }
    });

    // ヒーロー表示終了後に紙芝居を開始する。ヒーローは約10秒で現れ、1.5秒ほどでフェードアウトする。
    setTimeout(() => {
        // ヒーローセクションを非表示にする
        const heroEl = document.querySelector('.hero');
        if (heroEl) {
            heroEl.style.display = 'none';
        }
        // 紙芝居の各セクションを順番に表示
        let accumulated = 0;
        sequence.forEach((item) => {
            setTimeout(() => {
                const el = document.getElementById(item.id);
                if (el) {
                    el.style.display = 'flex';
                    el.style.transition = 'opacity 1s';
                    el.style.opacity = '1';
                    // 規定時間後にフェードアウトして非表示にする
                    setTimeout(() => {
                        el.style.opacity = '0';
                        setTimeout(() => {
                            el.style.display = 'none';
                        }, 1000);
                    }, item.duration * 1000);
                }
            }, accumulated * 1000);
            accumulated += item.duration;
        });
        // 全てのセクションが終わった後、暗転とロゴ表示を行う
        const totalDuration = sequence.reduce((sum, sec) => sum + sec.duration, 0);
        setTimeout(() => {
            // オーバーレイを暗転させる
            const overlayEl = document.querySelector('.overlay');
            if (overlayEl) {
                overlayEl.classList.add('darken');
            }
            // 暗転効果が進んだ後、ロゴを表示
            setTimeout(() => {
                const finalLogo = document.querySelector('.final-logo');
                if (finalLogo) {
                    finalLogo.style.display = 'flex';
                    finalLogo.style.transition = 'opacity 2s';
                    finalLogo.style.opacity = '1';
                    // ロゴを数秒間表示した後でボタンを表示する
                    setTimeout(() => {
                        const btn = finalLogo.querySelector('.logo-btn');
                        if (btn) {
                            btn.style.transition = 'opacity 2s';
                            btn.style.opacity = '1';
                        }
                    }, 4000);
                }
            }, 4000); // 暗転開始から4秒後にロゴを表示
        }, totalDuration * 1000);
    }, 12000); // 約10秒のヒーロー表示 + フェードアウト後のバッファを含め12秒後に開始
});