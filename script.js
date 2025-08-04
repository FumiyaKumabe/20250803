// タスク時間の設定値（編集可能）
let taskTimes = {
    attendance: 0.42,
    billing: 0.547,
    payroll: 0.192,
    documents: 0.122,
    communication: 0.086
};

// ROI Calculator Functions
function calculateROI() {
    const headcount = parseInt(document.getElementById('headcount').value) || 50;
    const invoice = parseInt(document.getElementById('invoice').value) || 20;
    const wage = parseInt(document.getElementById('wage').value) || 1800;
    
    // 詳細設定値の取得
    const regularDays = parseInt(document.getElementById('regular-days')?.value) || 21;
    const tempDays = parseInt(document.getElementById('temp-days')?.value) || 12;
    const dailyRate = parseInt(document.getElementById('daily-rate')?.value) || 14437;
    const regularRatio = (parseInt(document.getElementById('regular-ratio')?.value) || 60) / 100;
    const temporaryRatio = 1 - regularRatio;
    
    // 内勤タスク別計算式（編集可能な値を使用）
    const taskReductions = {
        attendance: taskTimes.attendance * headcount,      // 勤務入力
        billing: taskTimes.billing * invoice,              // 請求作成
        payroll: taskTimes.payroll * headcount,            // 給与集計
        documents: taskTimes.documents * headcount,        // 書類作成
        communication: taskTimes.communication * headcount // 連絡業務
    };
    
    // 削減時間計算
    const totalSavedHours = Object.values(taskReductions).reduce((sum, hours) => sum + hours, 0);
    
    // 削減額計算
    const savedAmount = totalSavedHours * wage;
    
    // 売上計算（詳細設定値を使用）
    const totalSales = dailyRate * ((headcount * regularRatio * regularDays) + (headcount * temporaryRatio * tempDays));
    
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
    console.log(`売上: ${Math.round(totalSales).toLocaleString()}円`);
    console.log(`設定値 - 常用比率: ${Math.round(regularRatio*100)}%, 常用日数: ${regularDays}, 臨時日数: ${tempDays}, 日額: ${dailyRate}円`);
    
    // タスク詳細の計算式更新
    const headcountValue = parseInt(document.getElementById('headcount').value);
    const invoiceValue = parseInt(document.getElementById('invoice').value);
    
    const attendanceFormulaEl = document.getElementById('attendance-formula');
    const billingFormulaEl = document.getElementById('billing-formula');
    const payrollFormulaEl = document.getElementById('payroll-formula');
    const documentsFormulaEl = document.getElementById('documents-formula');
    const communicationFormulaEl = document.getElementById('communication-formula');
    
    if (attendanceFormulaEl) attendanceFormulaEl.textContent = `${taskTimes.attendance}h × ${headcountValue}名 = ${(taskTimes.attendance * headcountValue).toFixed(1)}h/月`;
    if (billingFormulaEl) billingFormulaEl.textContent = `${taskTimes.billing}h × ${invoiceValue}件 = ${(taskTimes.billing * invoiceValue).toFixed(1)}h/月`;
    if (payrollFormulaEl) payrollFormulaEl.textContent = `${taskTimes.payroll}h × ${headcountValue}名 = ${(taskTimes.payroll * headcountValue).toFixed(1)}h/月`;
    if (documentsFormulaEl) documentsFormulaEl.textContent = `${taskTimes.documents}h × ${headcountValue}名 = ${(taskTimes.documents * headcountValue).toFixed(1)}h/月`;
    if (communicationFormulaEl) communicationFormulaEl.textContent = `${taskTimes.communication}h × ${headcountValue}名 = ${(taskTimes.communication * headcountValue).toFixed(1)}h/月`;
    
    // 再投資シナリオの更新
    updateReinvestmentScenarios();
}

// 詳細設定パネルの表示/非表示
function toggleAdvancedSettings() {
    const panel = document.getElementById('advanced-panel');
    const button = event.target.closest('button');
    
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block';
        button.innerHTML = '<i class="fas fa-cog"></i> 詳細設定を閉じる';
    } else {
        panel.style.display = 'none';
        button.innerHTML = '<i class="fas fa-cog"></i> 詳細設定モード（編集可）';
    }
}

// タスク詳細の表示/非表示
function toggleTaskDetail(taskId) {
    const detail = document.getElementById(`${taskId}-detail`);
    const button = event.target.closest('button');
    const icon = button.querySelector('i');
    
    if (detail.classList.contains('active')) {
        detail.classList.remove('active');
        button.classList.remove('active');
        icon.style.transform = 'rotate(0deg)';
        button.innerHTML = '<i class="fas fa-chevron-down"></i> 根拠を見る';
    } else {
        // 他の詳細を閉じる
        document.querySelectorAll('.task-detail').forEach(d => d.classList.remove('active'));
        document.querySelectorAll('.btn-detail').forEach(b => {
            b.classList.remove('active');
            b.querySelector('i').style.transform = 'rotate(0deg)';
            b.innerHTML = '<i class="fas fa-chevron-down"></i> 根拠を見る';
        });
        
        // 選択された詳細を開く
        detail.classList.add('active');
        button.classList.add('active');
        icon.style.transform = 'rotate(180deg)';
        button.innerHTML = '<i class="fas fa-chevron-up"></i> 閉じる';
    }
}

// タスク時間の更新
function updateTaskTime(taskId, value) {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
        taskTimes[taskId] = numValue;
        calculateROI(); // 再計算（計算式も自動更新される）
    }
}

function updateReinvestmentScenarios() {
    const monthlyHours = parseFloat(document.getElementById('saved-hours').textContent);
    
    // 各シナリオに削減時間を均等配分
    const scenarioHours = Math.round(monthlyHours / 3);
    
    // 営業効果計算 (32万円/h × 成功率83%)
    const salesRevenue = Math.round(scenarioHours * 320000 * 12 * 0.83 / 10000);
    const salesCalculation = `${scenarioHours}h×32万円×12ヶ月×83%＝${Math.round(scenarioHours * 320000 * 12 * 0.83 / 10000)}万円`;
    
    // 品質管理効果計算 (1.25%/h × 月売上1,500万円)
    const qualityEffect = scenarioHours * 1.25 * 12;
    const qualitySavings = Math.round(15000000 * 0.0067 * qualityEffect / 100 / 10000);
    const qualityCalculation = `${scenarioHours}h×1.25%×12ヶ月＝${qualityEffect}%クレーム減少`;
    
    // 教育効果計算 (0.37%/h × 採用コスト175万円)
    const trainingEffect = Math.round(scenarioHours * 0.37 * 100) / 100;
    const trainingSavings = 175;
    const trainingCalculation = `${scenarioHours}h×0.37%＝${trainingEffect}%改善`;
    
    // DOM更新
    const salesHoursEl = document.getElementById('sales-hours');
    const salesRevenueEl = document.getElementById('sales-revenue');
    const salesCalculationEl = document.getElementById('sales-calculation');
    
    const qualityHoursEl = document.getElementById('quality-hours');
    const qualitySavingsEl = document.getElementById('quality-savings');
    const qualityCalculationEl = document.getElementById('quality-calculation');
    
    const trainingHoursEl = document.getElementById('training-hours');
    const trainingSavingsEl = document.getElementById('training-savings');
    const trainingCalculationEl = document.getElementById('training-calculation');
    
    if (salesHoursEl) salesHoursEl.textContent = scenarioHours;
    if (salesRevenueEl) salesRevenueEl.textContent = salesRevenue;
    if (salesCalculationEl) salesCalculationEl.textContent = salesCalculation;
    
    if (qualityHoursEl) qualityHoursEl.textContent = scenarioHours;
    if (qualitySavingsEl) qualitySavingsEl.textContent = qualitySavings;
    if (qualityCalculationEl) qualityCalculationEl.textContent = qualityCalculation;
    
    if (trainingHoursEl) trainingHoursEl.textContent = scenarioHours;
    if (trainingSavingsEl) trainingSavingsEl.textContent = trainingSavings;
    if (trainingCalculationEl) trainingCalculationEl.textContent = trainingCalculation;
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
    const target = document.getElementById('roi');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = target.offsetTop - headerHeight - 20;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
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

// Case Study Functions
function showCaseDetail(caseId) {
    // デモ用のアラート - 実際の実装では詳細PDFを表示
    const caseNames = {
        'case-a': 'A社（中部地方・地域密着型警備会社）',
        'case-b': 'B社（関東圏・総合警備会社）',
        'case-c': 'C社（関西圏・ISO認証取得企業）'
    };
    
    alert(`${caseNames[caseId]}の詳細資料を表示します。\n（デモ版のため、実際のPDFは表示されません）`);
    
    // 実際の実装例:
    // window.open(`/case-studies/${caseId}-detail.pdf`, '_blank');
}

function contactCase(caseId) {
    // デモ用のアラート - 実際の実装では担当者連絡フォームを表示
    const caseNames = {
        'case-a': 'A社（中部地方・地域密着型警備会社）',
        'case-b': 'B社（関東圏・総合警備会社）',
        'case-c': 'C社（関西圏・ISO認証取得企業）'
    };
    
    alert(`${caseNames[caseId]}の担当者に相談します。\n（デモ版のため、実際の連絡フォームは表示されません）`);
    
    // 実際の実装例:
    // showContactForm(caseId);
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
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
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