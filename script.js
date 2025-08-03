// ROI Calculator Functions
function calculateROI() {
    const headcount = parseInt(document.getElementById('headcount').value) || 50;
    const invoice = parseInt(document.getElementById('invoice').value) || 20;
    const wage = parseInt(document.getElementById('wage').value) || 1800;
    
    // 内勤タスク別計算式
    const taskReductions = {
        attendance: 0.42 * headcount,      // 勤務入力
        billing: 0.547 * invoice,          // 請求作成
        payroll: 0.192 * headcount,        // 給与集計
        documents: 0.122 * headcount,      // 書類作成
        communication: 0.086 * headcount   // 連絡業務
    };
    
    // 削減時間計算
    const totalSavedHours = Object.values(taskReductions).reduce((sum, hours) => sum + hours, 0);
    
    // 削減額計算
    const savedAmount = totalSavedHours * wage;
    
    // 売上計算
    const regularRatio = 0.6;
    const temporaryRatio = 0.4;
    const regularDays = 21;
    const temporaryDays = 12;
    const dailyRate = 14437;
    
    const totalSales = dailyRate * ((headcount * regularRatio * regularDays) + (headcount * temporaryRatio * temporaryDays));
    
    // 未請求回収
    const uncollectedRecovery = totalSales * 0.004;
    
    // その他固定削減
    const otherSavings = 13500;
    
    // 離職率改善効果
    const currentTurnoverRate = 0.123; // 12.3%
    const improvedTurnoverRate = 0.086; // 8.6% (30%減少)
    const turnoverReduction = currentTurnoverRate - improvedTurnoverRate;
    const annualTurnoverSavings = headcount * turnoverReduction * 350000; // 35万円/人
    
    // 月間純メリット
    const monthlyBenefit = savedAmount + uncollectedRecovery + otherSavings + (annualTurnoverSavings / 12);
    
    // 年間効果
    const yearlyBenefit = monthlyBenefit * 12;
    
    // 結果を表示
    document.getElementById('saved-hours').textContent = `${totalSavedHours.toFixed(1)} h/月`;
    document.getElementById('monthly-benefit').textContent = `${Math.round(monthlyBenefit).toLocaleString()} 円`;
    document.getElementById('yearly-benefit').textContent = `${Math.round(yearlyBenefit).toLocaleString()} 円`;
    
    // 詳細結果の表示（デバッグ用）
    console.log('ROI計算詳細:');
    console.log(`削減時間: ${totalSavedHours.toFixed(1)}h/月`);
    console.log(`人件費削減: ${savedAmount.toLocaleString()}円/月`);
    console.log(`未請求回収: ${Math.round(uncollectedRecovery).toLocaleString()}円/月`);
    console.log(`その他削減: ${otherSavings.toLocaleString()}円/月`);
    console.log(`離職率改善: ${Math.round(annualTurnoverSavings / 12).toLocaleString()}円/月`);
    console.log(`月間合計: ${Math.round(monthlyBenefit).toLocaleString()}円`);
    console.log(`年間合計: ${Math.round(yearlyBenefit).toLocaleString()}円`);
    
    // 再投資シナリオの更新
    updateReinvestmentScenarios(totalSavedHours);
}

function updateReinvestmentScenarios(savedHours) {
    const scenarios = document.querySelectorAll('.scenario-card');
    
    // 営業深耕の効果計算
    const salesHours = Math.min(30, savedHours * 0.4);
    const salesEffect = Math.round(salesHours * 32 * 12); // 月32万円効果と仮定
    
    // 品質改善の効果
    const qualityHours = Math.min(20, savedHours * 0.26);
    const qualityEffect = Math.round(25 - (qualityHours / 20) * 25);
    
    // 教育の効果
    const trainingHours = Math.min(27, savedHours * 0.34);
    const trainingEffect = Math.round(10 - (trainingHours / 27) * 10);
    
    if (scenarios.length >= 3) {
        scenarios[0].innerHTML = `
            <h4>営業深耕</h4>
            <p>配分: ${salesHours.toFixed(0)} h/月</p>
            <p>年間効果: <strong>受注 +${salesEffect} 万円</strong></p>
        `;
        
        scenarios[1].innerHTML = `
            <h4>品質改善</h4>
            <p>配分: ${qualityHours.toFixed(0)} h/月</p>
            <p>年間効果: <strong>クレーム ▲${qualityEffect}％</strong></p>
        `;
        
        scenarios[2].innerHTML = `
            <h4>隊員教育</h4>
            <p>配分: ${trainingHours.toFixed(0)} h/月</p>
            <p>年間効果: <strong>離職率 ▲${trainingEffect}％</strong></p>
        `;
    }
}

// FAQ Toggle Function
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-answer').forEach(item => {
        if (item !== answer) {
            item.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.faq-question i').forEach(item => {
        if (item !== icon) {
            item.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ item
    answer.classList.toggle('active');
    
    if (answer.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

// Smooth Scroll Functions
function scrollToROI() {
    document.getElementById('roi').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToCases() {
    document.getElementById('cases').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// CTA Functions
function downloadResource() {
    // デモ用のアラート - 実際の実装では資料ダウンロードのロジックを実装
    alert('資料ダウンロードページに移動します。\n（デモ版のため、実際のダウンロードは行われません）');
    
    // 実際の実装例:
    // window.open('/download/keibi-pro-brochure.pdf', '_blank');
    
    // またはフォーム表示:
    // showDownloadForm();
}

function showDemo() {
    // デモ用のアラート - 実際の実装ではデモ動画やデモページを表示
    alert('2分デモ動画を再生します。\n（デモ版のため、実際の動画は表示されません）');
    
    // 実際の実装例:
    // showVideoModal();
    // または
    // window.open('/demo', '_blank');
}

// Form Validation (資料ダウンロード用)
function showDownloadForm() {
    const formHTML = `
        <div id="download-modal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal()">&times;</span>
                <h3>資料ダウンロード</h3>
                <form id="download-form" onsubmit="submitDownloadForm(event)">
                    <div class="form-group">
                        <label for="company">会社名 *</label>
                        <input type="text" id="company" name="company" required>
                    </div>
                    <div class="form-group">
                        <label for="name">お名前 *</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">メールアドレス *</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">電話番号</label>
                        <input type="tel" id="phone" name="phone">
                    </div>
                    <div class="form-group">
                        <label for="employees">従業員数</label>
                        <select id="employees" name="employees">
                            <option value="">選択してください</option>
                            <option value="1-10">1-10名</option>
                            <option value="11-30">11-30名</option>
                            <option value="31-100">31-100名</option>
                            <option value="101-300">101-300名</option>
                            <option value="301+">301名以上</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">資料をダウンロード</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHTML);
    document.getElementById('download-modal').style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('download-modal');
    if (modal) {
        modal.remove();
    }
}

function submitDownloadForm(event) {
    event.preventDefault();
    
    // フォームデータの取得
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // バリデーション
    if (!data.company || !data.name || !data.email) {
        alert('必須項目を入力してください。');
        return;
    }
    
    // 実際の実装では、ここでサーバーにデータを送信
    console.log('Form submitted:', data);
    
    // デモ用の処理
    alert('資料ダウンロードリンクをメールで送信いたします。');
    closeModal();
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を監視
    document.querySelectorAll('.type-card, .issue-card, .case-card, .result-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Number Counter Animation
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(number => {
        const target = parseInt(number.textContent.replace(/[^\d]/g, ''));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (number.textContent.includes('%')) {
                number.textContent = `${Math.floor(current)}%`;
            } else if (number.textContent.includes('社')) {
                number.textContent = `${Math.floor(current).toLocaleString()}社以上`;
            } else {
                number.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // 初期ROI計算
    calculateROI();
    
    // スクロールアニメーションの初期化
    initScrollAnimations();
    
    // 数字アニメーション（Trust Barが表示されたときに実行）
    const trustBar = document.querySelector('.trust-bar');
    const trustObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                trustObserver.unobserve(entry.target);
            }
        });
    });
    
    if (trustBar) {
        trustObserver.observe(trustBar);
    }
    
    // ナビゲーションのスムーズスクロール
    document.querySelectorAll('.nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // モバイルメニューの処理（必要に応じて）
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });
});

// モーダル用のCSS（動的に追加）
const modalCSS = `
.modal {
    display: none;
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
}

.modal-content {
    background-color: white;
    margin: 5% auto;
    padding: 2rem;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    position: relative;
}

.close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 2rem;
    cursor: pointer;
    color: #999;
}

.close:hover {
    color: #333;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: #00d2d3;
}
`;

// CSS を動的に追加
const style = document.createElement('style');
style.textContent = modalCSS;
document.head.appendChild(style);