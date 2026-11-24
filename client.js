/* eslint-disable */
window.__ModuleLoader__.load({
  id: 'dsh-deepseek-atlas',
  factory(require) {
    const React = require('react');
    const ReactDOM = require('react-dom');
    const h = React.createElement;
    const {
      useCallback,
      useEffect,
      useLayoutEffect,
      useMemo,
      useRef,
      useState,
      useSyncExternalStore,
    } = React;

    const NS = 'dsh-deepseek-atlas';
    const STYLE_ID = 'dsh-deepseek-atlas:styles';
    const DEFAULT_EFFORT = '__dsa_provider_default__';
    const NOW = new Date();
    const NOW_YEAR = NOW.getFullYear();
    const NOW_MONTH = `${NOW_YEAR}-${String(NOW.getMonth() + 1).padStart(2, '0')}`;
    const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const MONTH_CN = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const YEARS = [2024, 2025, 2026, 2027];

    const FAMILIES = {
      flagship: {
        label: '旗舰',
        en: 'Flagship',
        color: '#829BFF',
        bg: 'rgba(130, 155, 255, 0.13)',
        border: 'rgba(130, 155, 255, 0.34)',
        wash: 'rgba(130, 155, 255, 0.10)',
      },
      flash: {
        label: '轻量',
        en: 'Flash',
        color: '#5ED8C6',
        bg: 'rgba(94, 216, 198, 0.11)',
        border: 'rgba(94, 216, 198, 0.30)',
        wash: 'rgba(94, 216, 198, 0.08)',
      },
      reasoning: {
        label: '推理',
        en: 'Reasoning',
        color: '#F0BE67',
        bg: 'rgba(240, 190, 103, 0.11)',
        border: 'rgba(240, 190, 103, 0.30)',
        wash: 'rgba(240, 190, 103, 0.08)',
      },
      special: {
        label: '专项',
        en: 'Special',
        color: '#C79DF5',
        bg: 'rgba(199, 157, 245, 0.11)',
        border: 'rgba(199, 157, 245, 0.30)',
        wash: 'rgba(199, 157, 245, 0.08)',
      },
      frontier: {
        label: '前瞻',
        en: 'Frontier',
        color: '#F08CB6',
        bg: 'rgba(240, 140, 182, 0.10)',
        border: 'rgba(240, 140, 182, 0.28)',
        wash: 'rgba(240, 140, 182, 0.07)',
      },
    };

    const LANES = [
      { id: 'flagship', label: '旗舰', en: 'Flagship' },
      { id: 'flash', label: '轻量', en: 'Flash' },
      { id: 'reasoning', label: '推理', en: 'Reasoning' },
      { id: 'special', label: '专项', en: 'Special' },
      { id: 'frontier', label: '前瞻', en: 'Frontier' },
    ];

    // Release record for the table. Runtime catalog entries are merged into
    // these rows; entries marked forecast stay disabled and are visibly ghosts.
    const ARCHIVE = [
      {
        key: 'v2',
        month: '2024-05',
        day: 6,
        symbol: 'V2',
        short: 'V2',
        name: 'DeepSeek-V2',
        lane: 'flagship',
        params: '236B / 21B',
        context: '128K',
        summary: 'MLA 与 DeepSeekMoE 首次合体，把推理成本压到同级别模型的约五分之一。',
      },
      {
        key: 'coder-v2',
        month: '2024-06',
        day: 17,
        symbol: 'CV',
        short: 'Coder-V2',
        name: 'DeepSeek-Coder-V2',
        lane: 'special',
        params: '236B / 21B',
        context: '128K',
        summary: '面向代码的开源模型，覆盖 338 种编程语言，并支持 128K 上下文。',
      },
      {
        key: 'v2-lite',
        month: '2024-06',
        day: 19,
        symbol: 'L',
        short: 'V2-Lite',
        name: 'DeepSeek-V2-Lite',
        lane: 'flash',
        params: '16B / 2.4B',
        context: '32K',
        summary: '轻量 MoE 版本，16B 总参数、2.4B 激活，适合单机与边缘部署。',
      },
      {
        key: 'v2-5',
        month: '2024-09',
        day: 5,
        symbol: 'V2.5',
        short: 'V2.5',
        name: 'DeepSeek-V2.5',
        lane: 'flagship',
        params: '236B / 21B',
        context: '128K',
        summary: '合并 Chat 与 Coder 两条产品线，通用对话与代码能力第一次统一。',
      },
      {
        key: 'vl2',
        month: '2024-12',
        day: 13,
        symbol: 'VL',
        short: 'VL2',
        name: 'DeepSeek-VL2',
        lane: 'special',
        params: 'MoE',
        context: '—',
        summary: '视觉语言模型，采用动态切片与 MoE 结构，处理高分辨率图像输入。',
      },
      {
        key: 'v3',
        month: '2024-12',
        day: 26,
        symbol: 'V3',
        short: 'V3',
        name: 'DeepSeek-V3',
        lane: 'flagship',
        params: '671B / 37B',
        context: '128K',
        summary: '671B 总参数、37B 激活的 MoE 旗舰；14.8T tokens，FP8 训练。',
      },
      {
        key: 'r1',
        month: '2025-01',
        day: 20,
        symbol: 'R1',
        short: 'R1',
        name: 'DeepSeek-R1',
        lane: 'reasoning',
        params: '671B / 37B',
        context: '128K',
        summary: '纯强化学习激发推理能力的开源时刻，链式思考进入主舞台。',
      },
      {
        key: 'v3-0324',
        month: '2025-03',
        day: 24,
        symbol: 'V3',
        short: 'V3-0324',
        name: 'DeepSeek-V3-0324',
        lane: 'flagship',
        params: '671B / 37B',
        context: '128K',
        summary: 'V3 的第一次重要迭代，推理、代码与多轮对话能力全面增强。',
      },
      {
        key: 'r1-0528',
        month: '2025-05',
        day: 28,
        symbol: 'R1',
        short: 'R1-0528',
        name: 'DeepSeek-R1-0528',
        lane: 'reasoning',
        params: '671B / 37B',
        context: '128K',
        summary: 'R1 的深度更新，降低幻觉，复杂推理与代码生成更稳定。',
      },
      {
        key: 'v3-1',
        month: '2025-08',
        day: 21,
        symbol: 'V3.1',
        short: 'V3.1',
        name: 'DeepSeek-V3.1',
        lane: 'flagship',
        params: '671B / 37B',
        context: '128K',
        summary: '混合思考架构：同一模型切换快思考与慢思考，采用 MIT 许可。',
      },
      {
        key: 'v3-1-terminus',
        month: '2025-09',
        day: 22,
        symbol: 'T',
        short: 'Terminus',
        name: 'DeepSeek-V3.1-Terminus',
        lane: 'flagship',
        params: '671B / 37B',
        context: '128K',
        summary: 'Terminus 修整版，收敛语言一致性与 Agent 工具调用的稳定性。',
      },
      {
        key: 'v3-2-exp',
        month: '2025-09',
        day: 29,
        symbol: 'EXP',
        short: 'V3.2-Exp',
        name: 'DeepSeek-V3.2-Exp',
        lane: 'special',
        params: '671B / 37B',
        context: '128K',
        summary: '实验性稀疏注意力（DSA），长文本效率跃升，API 价格大幅下调。',
      },
      {
        key: 'v3-2',
        month: '2025-12',
        day: 1,
        symbol: 'V3.2',
        short: 'V3.2',
        name: 'DeepSeek-V3.2',
        lane: 'flagship',
        params: '671B / 37B',
        context: '128K',
        summary: '把思考能力直接嵌入工具调用，日常 Agent 与长程任务更顺手。',
      },
      {
        key: 'v3-2-speciale',
        month: '2025-12',
        day: 1,
        symbol: 'SP',
        short: 'Speciale',
        name: 'DeepSeek-V3.2-Speciale',
        lane: 'special',
        params: '671B / 37B',
        context: '128K',
        summary: '面向极限推理的研究变体，在 IMO、CMO、ICPC、IOI 达到金牌水平。',
      },
      {
        key: 'v4-preview',
        month: '2026-04',
        day: 24,
        symbol: 'V4',
        short: 'V4 Preview',
        name: 'DeepSeek-V4 Preview',
        lane: 'frontier',
        params: '1.6T / 49B',
        context: '1M',
        summary: 'V4 架构预览：1M 上下文、原生多模态，并首次在昇腾平台发布。',
      },
      {
        key: 'v4-flash',
        month: '2026-04',
        day: 24,
        symbol: 'V4F',
        short: 'V4-Flash',
        name: 'DeepSeek-V4-Flash',
        lane: 'flash',
        params: '284B / 13B',
        context: '1M',
        summary: '与 V4-Pro 同代的轻量旗舰，284B 总参数、13B 激活，主打低成本长上下文。',
      },
      {
        key: 'v4-1-flash',
        month: '2026-10',
        day: 17,
        symbol: 'V4.1',
        short: 'V4.1-Flash',
        name: 'DeepSeek-V4.1-Flash',
        lane: 'flash',
        params: '284B / 13B',
        context: '1M',
        apiIds: ['deepseek-flash', 'deepseek-v4.1-flash', 'deepseek-v4.1-flash-1017'],
        summary: '当前目录中的高速主力：1M 上下文、图文输入，适合大规模日常调用。',
      },
      {
        key: 'v4-pro',
        month: '2026-08',
        day: 13,
        symbol: 'V4P',
        short: 'V4-Pro',
        name: 'DeepSeek-V4-Pro',
        lane: 'flagship',
        params: '1.6T / 49B',
        context: '1M',
        apiIds: ['deepseek-v4-pro', 'deepseek-v4-pro-0813', 'deepseek-v4-pro-20260813'],
        summary: 'V4 正式旗舰，1.6T 总参数、49B 激活，面向复杂推理与 Agent 工作负载。',
      },
      {
        key: 'v4-1-pro',
        month: '2026-11',
        day: 30,
        symbol: 'V4.1P',
        short: 'V4.1-Pro',
        name: 'DeepSeek-V4.1-Pro',
        lane: 'frontier',
        params: '1.6T / 49B',
        context: '1M',
        forecast: true,
        summary: '预期中的 Pro 迭代：更强工具编排与长程一致性；发布日期为路线图推测。',
      },
      {
        key: 'v4-2',
        month: '2026-12',
        day: 20,
        symbol: 'V4.2',
        short: 'V4.2',
        name: 'DeepSeek-V4.2',
        lane: 'frontier',
        params: '2T+ / 64B',
        context: '2M',
        forecast: true,
        summary: '路线图传闻：更大激活规模与 2M 上下文，尚未得到官方确认。',
      },
      {
        key: 'r2',
        month: '2026-12',
        day: 10,
        symbol: 'R2',
        short: 'R2',
        name: 'DeepSeek-R2',
        lane: 'reasoning',
        params: '未公布',
        context: '—',
        forecast: true,
        summary: '期待中的下一代推理模型，重点可能在可验证推理与自我校验。',
      },
      {
        key: 'v5-preview',
        month: '2027-03',
        day: 15,
        symbol: 'V5',
        short: 'V5 Preview',
        name: 'DeepSeek-V5 Preview',
        lane: 'frontier',
        params: '—',
        context: '—',
        forecast: true,
        summary: '前瞻占位：下一代基础架构的预览窗口，公开信息仍然有限。',
      },
      {
        key: 'v5',
        month: '2027-06',
        day: 15,
        symbol: 'V5',
        short: 'V5',
        name: 'DeepSeek-V5',
        lane: 'frontier',
        params: '—',
        context: '—',
        forecast: true,
        summary: '路线图占位：下一代旗舰，预计继续沿 MoE 与稀疏注意力方向演进。',
      },
      {
        key: 'v5-flash',
        month: '2027-06',
        day: 15,
        symbol: 'V5F',
        short: 'V5-Flash',
        name: 'DeepSeek-V5-Flash',
        lane: 'flash',
        params: '—',
        context: '—',
        forecast: true,
        summary: '轻量线的下一代占位：更低延迟、更低成本，规格尚未公布。',
      },
      {
        key: 'v5-pro',
        month: '2027-09',
        day: 15,
        symbol: 'V5P',
        short: 'V5-Pro',
        name: 'DeepSeek-V5-Pro',
        lane: 'flagship',
        params: '—',
        context: '—',
        forecast: true,
        summary: '旗舰线的远期占位：为 2027 下半年的 Pro 版本预留的位置。',
      },
    ];

    // Capability tags are short, hand-written labels for the inspector; they
    // describe the intended workload rather than an official benchmark.
    const MODEL_TAGS = {
      v2: ['基础对话', '128K 上下文'],
      'coder-v2': ['代码补全', '仓库级理解'],
      'v2-lite': ['轻量推理', '低成本'],
      'v2-5': ['通用对话', 'MoE 架构'],
      vl2: ['图像理解', '多模态'],
      v3: ['MoE 671B', '通用旗舰'],
      r1: ['深度推理', '链式思考'],
      'v3-0324': ['代码增强', '工具调用'],
      'r1-0528': ['推理增强', '长链思考'],
      'v3-1': ['混合推理', 'Agent 负载'],
      'v3-1-terminus': ['终端智能体', '长任务'],
      'v3-2-exp': ['实验版本', '稀疏注意力'],
      'v3-2': ['稀疏注意力', '高效推理'],
      'v3-2-speciale': ['极限推理', '竞赛数学'],
      'v4-preview': ['预览版本', '架构验证'],
      'v4-flash': ['高速响应', '日常调用'],
      'v4-1-flash': ['1M 上下文', '图文输入', '高吞吐'],
      'v4-pro': ['复杂推理', 'Agent 负载'],
      'v4-1-pro': ['旗舰推理', '长上下文'],
      'v4-2': ['下一代旗舰', '多模态'],
      r2: ['深度推理', '自主规划'],
      'v5-preview': ['预览版本', '下一代架构'],
      v5: ['通用旗舰', '多模态'],
      'v5-flash': ['轻量极速', '大规模部署'],
      'v5-pro': ['超大参数', '复杂任务'],
    };

    // Relative list-price multiplier shown in the inspector. It is a rough,
    // illustrative ratio against V2 (not official pricing), so the UI labels
    // it explicitly as a relative number.
    const MODEL_PRICE = {
      v2: '1.0×',
      'coder-v2': '1.2×',
      'v2-lite': '0.35×',
      'v2-5': '1.1×',
      vl2: '1.4×',
      v3: '1.6×',
      r1: '2.0×',
      'v3-0324': '1.7×',
      'r1-0528': '2.2×',
      'v3-1': '1.8×',
      'v3-1-terminus': '2.0×',
      'v3-2-exp': '1.9×',
      'v3-2': '1.7×',
      'v3-2-speciale': '3.2×',
      'v4-preview': '2.2×',
      'v4-flash': '0.2×',
      'v4-1-flash': '0.12×',
      'v4-pro': '2.4×',
      'v4-1-pro': '2.8×',
      'v4-2': '3.0×',
      r2: '3.4×',
      'v5-preview': '—',
      v5: '—',
      'v5-flash': '—',
      'v5-pro': '—',
    };

    const OFFICIAL_ENDPOINT = '/api/dsh-deepseek-atlas/official.json';
    const OFFICIAL_REFRESH_ENDPOINT = '/api/dsh-deepseek-atlas/refresh';
    const OFFICIAL_PAGE_URL = 'https://api-docs.deepseek.com/quick_start/pricing';
    const OFFICIAL_POLL_MS = 10 * 60 * 1000;
    // Explicit archive ↔ official id mapping. Do not let a retired alias make
    // two historical cards claim the same current official model.
    const OFFICIAL_RECORD_IDS = {
      'v4-1-flash': 'deepseek-flash',
      'v4-pro': 'deepseek-v4-pro',
    };

    // Last-known official values, used only when the host sync route is not
    // reachable yet (for example before the desktop app is restarted after the
    // host half is installed). The host snapshot replaces this on first pull.
    const FALLBACK_OFFICIAL = {
      schema: 1,
      source: 'builtin',
      sourceUrl: 'https://api-docs.deepseek.com/quick_start/pricing.md',
      pageUrl: OFFICIAL_PAGE_URL,
      fetchedAt: null,
      checkedAt: null,
      stale: true,
      error: null,
      models: [
        {
          id: 'deepseek-flash',
          version: 'DeepSeek-V4.1-Flash-1017',
          context: '1M',
          maxOutput: '384K',
          thinking: 'Supports both non-thinking and thinking (default) modes',
          features: { json: true, tools: true, responses: true, anthropic: true, prefix: true, fim: 'Non-thinking mode only', vision: true },
          pricing: {
            cacheHit: { offPeak: 0.003, peak: 0.006 },
            cacheMiss: { offPeak: 0.15, peak: 0.3 },
            output: { offPeak: 0.6, peak: 1.2 },
          },
          concurrency: 2500,
          baseUrls: { openai: 'https://api.deepseek.com', anthropic: 'https://api.deepseek.com/anthropic' },
          aliases: ['deepseek-v4-flash', 'deepseek-v4-flash-vision-exp'],
          releaseHint: { month: 10, day: 17 },
        },
        {
          id: 'deepseek-v4-pro',
          version: 'DeepSeek-V4-Pro-0813',
          context: '1M',
          maxOutput: '384K',
          thinking: 'Supports both non-thinking and thinking (default) modes',
          features: { json: true, tools: true, responses: true, anthropic: true, prefix: true, fim: 'Non-thinking mode only', vision: false },
          pricing: {
            cacheHit: { offPeak: 0.022, peak: 0.044 },
            cacheMiss: { offPeak: 0.66, peak: 1.32 },
            output: { offPeak: 1.98, peak: 3.96 },
          },
          concurrency: 500,
          baseUrls: { openai: 'https://api.deepseek.com', anthropic: 'https://api.deepseek.com/anthropic' },
          aliases: [],
          releaseHint: { month: 8, day: 13 },
        },
      ],
    };

    const CSS = String.raw`
.dsa-seat,
.dsa-root,
.dsa-pop {
  --dsa-ink: #05080f;
  --dsa-panel: #0b111b;
  --dsa-panel-2: #0e1622;
  --dsa-paper: #e9eef8;
  --dsa-muted: #8b98ad;
  --dsa-muted-2: #8493ab;
  --dsa-line: rgba(151, 169, 196, 0.115);
  --dsa-line-strong: rgba(151, 169, 196, 0.22);
  --dsa-accent: #829bff;
  --dsa-accent-soft: rgba(130, 155, 255, 0.13);
  --dsa-ok: #74d9ad;
  --dsa-warn: #f0be67;
  --dsa-danger: #f08c9b;
  --dsa-mono: "SFMono-Regular", "Cascadia Code", "Roboto Mono", Consolas, "Liberation Mono", monospace;
  --dsa-sans: "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  --dsa-display: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, "Songti SC", "Noto Serif CJK SC", serif;
}

/* ── composer seat ─────────────────────────────────────────────── */
.dsa-seat {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  max-width: min(310px, 44vw);
  -webkit-app-region: no-drag;
}

.dsa-trigger {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  max-width: 100%;
  height: 27px;
  padding: 0 7px;
  border: 1px solid transparent;
  border-radius: 7px;
  background: transparent;
  color: var(--dsw-alias-label-secondary, #8b98ad);
  font: inherit;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  transition: background 140ms ease, border-color 140ms ease, color 140ms ease;
}

.dsa-trigger:hover {
  background: var(--dsw-alias-bg-layer-2, rgba(255, 255, 255, 0.055));
  border-color: var(--dsw-alias-border-l1, rgba(151, 169, 196, 0.14));
  color: var(--dsw-alias-label-primary, #e9eef8);
}

.dsa-trigger.is-open {
  background: var(--dsw-alias-bg-layer-2, rgba(255, 255, 255, 0.06));
  border-color: var(--dsw-alias-border-l2, rgba(151, 169, 196, 0.24));
  color: var(--dsw-alias-label-primary, #e9eef8);
}

.dsa-trigger:disabled {
  opacity: 0.45;
  cursor: default;
}

.dsa-trigger:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary, #829bff);
  outline-offset: 2px;
}

.dsa-trigger-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #7189f4;
  flex: none;
}

.dsa-trigger-label {
  display: var(--dsh-composer-model-text-display, inline);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsa-trigger-effort {
  display: var(--dsh-composer-model-text-display, inline-block);
  flex: none;
  max-width: 68px;
  padding: 2px 5px;
  border: 1px solid var(--dsw-alias-border-l1, rgba(151, 169, 196, 0.13));
  border-radius: 4px;
  color: var(--dsw-alias-label-secondary, #8b98ad);
  font-size: 9px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsa-chevron {
  flex: none;
  color: currentColor;
  opacity: 0.62;
  transition: transform 160ms ease;
}

.dsa-chevron.is-open {
  transform: rotate(180deg);
}

.dsa-model-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  overflow: hidden;
}

.dsa-fallback-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsa-spinner {
  width: 12px;
  height: 12px;
  flex: none;
  border: 1.5px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: dsa-spin 750ms linear infinite;
  opacity: 0.7;
}

/* ── quick switcher ────────────────────────────────────────────── */
.dsa-pop {
  position: fixed;
  inset: auto;
  z-index: 2147483000;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--dsa-line-strong);
  border-radius: 14px;
  background:
    radial-gradient(120% 80% at 100% 0%, rgba(130, 155, 255, 0.09), transparent 48%),
    linear-gradient(180deg, #121b29 0%, #0b111b 100%);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.52), 0 0 0 1px rgba(0, 0, 0, 0.35);
  color: var(--dsa-paper);
  color-scheme: dark;
  font-family: var(--dsa-sans);
  font-size: 12px;
  animation: dsa-pop-in 140ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.dsa-pop::backdrop {
  background: transparent;
}

.dsa-pop-head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 13px 13px 10px;
  border-bottom: 1px solid var(--dsa-line);
}

.dsa-pop-head-copy {
  min-width: 0;
  flex: 1;
}

.dsa-pop-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--dsa-paper);
}

.dsa-pop-sub {
  margin-top: 3px;
  color: var(--dsa-muted);
  font-size: 9.5px;
  line-height: 1.35;
}

.dsa-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex: none;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--dsa-muted);
  cursor: pointer;
}

.dsa-icon-button:hover {
  border-color: var(--dsa-line);
  background: rgba(255, 255, 255, 0.055);
  color: var(--dsa-paper);
}

.dsa-icon-button:focus-visible {
  outline: 2px solid var(--dsa-accent);
  outline-offset: 1px;
}

.dsa-pop-search-wrap {
  padding: 9px 11px 0;
}

.dsa-pop-search {
  width: 100%;
  height: 29px;
  border: 1px solid var(--dsa-line);
  border-radius: 7px;
  background: rgba(4, 8, 14, 0.45);
  color: var(--dsa-paper);
  font: inherit;
  font-size: 10.5px;
  padding: 0 9px;
  outline: none;
}

.dsa-pop-search::placeholder {
  color: var(--dsa-muted-2);
}

.dsa-pop-search:focus {
  border-color: rgba(130, 155, 255, 0.5);
  box-shadow: 0 0 0 2px rgba(130, 155, 255, 0.11);
}

.dsa-pop-error {
  margin: 8px 11px 0;
  padding: 6px 8px;
  border: 1px solid rgba(240, 140, 155, 0.28);
  border-radius: 6px;
  background: rgba(240, 140, 155, 0.09);
  color: #ffb9c3;
  font-size: 9.5px;
  line-height: 1.4;
}

.dsa-pop-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: 6px 8px 10px;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(151, 169, 196, 0.34) transparent;
}

.dsa-pop-scroll::-webkit-scrollbar {
  width: 8px;
}

.dsa-pop-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.dsa-pop-scroll::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  border-radius: 99px;
  background: rgba(151, 169, 196, 0.34);
  background-clip: padding-box;
}

.dsa-pop-note {
  margin: 3px 4px 7px;
  padding: 5px 7px;
  border-radius: 5px;
  background: rgba(240, 190, 103, 0.07);
  color: #d9be8f;
  font-size: 9px;
  line-height: 1.35;
}

.dsa-pop-group {
  margin-top: 5px;
}

.dsa-pop-group:first-child {
  margin-top: 0;
}

.dsa-pop-group-head {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 7px 5px;
  background: #111a27;
  box-shadow: 0 1px 0 var(--dsa-line);
}

.dsa-pop-group-name {
  color: var(--dsa-muted);
  font-family: var(--dsa-mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.dsa-pop-group-count {
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 9px;
}

.dsa-pop-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 7px 7px;
  border: 1px solid transparent;
  border-radius: 7px;
  background: transparent;
  color: var(--dsa-paper);
  text-align: left;
  cursor: pointer;
}

.dsa-pop-row:hover {
  background: rgba(255, 255, 255, 0.045);
  border-color: var(--dsa-line);
}

.dsa-pop-row.is-current {
  background: var(--dsa-accent-soft);
  border-color: rgba(130, 155, 255, 0.3);
}

.dsa-pop-row:disabled {
  opacity: 0.5;
  cursor: default;
}

.dsa-pop-row:focus-visible {
  outline: 2px solid var(--dsa-accent);
  outline-offset: -2px;
}

.dsa-pop-row-main {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.dsa-pop-row-title {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  font-size: 11.5px;
  font-weight: 520;
  line-height: 1.25;
}

.dsa-pop-row-title .dsa-model-label {
  min-width: 0;
}

.dsa-pop-row-meta {
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 10px;
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsa-pop-badge {
  flex: none;
  padding: 1px 5px;
  border: 1px solid rgba(151, 169, 196, 0.16);
  border-radius: 999px;
  color: var(--dsa-muted);
  font-size: 9px;
  line-height: 1.4;
  letter-spacing: 0.02em;
}

.dsa-pop-badge[data-tone="success"] { color: #91e5bf; border-color: rgba(116, 217, 173, 0.3); }
.dsa-pop-badge[data-tone="warning"] { color: #e9c583; border-color: rgba(240, 190, 103, 0.28); }
.dsa-pop-badge[data-tone="danger"] { color: #f3aab5; border-color: rgba(240, 140, 155, 0.3); }
.dsa-pop-badge[data-tone="info"] { color: #aabaff; border-color: rgba(130, 155, 255, 0.3); }

.dsa-pop-row-tail {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  flex: none;
  color: var(--dsa-accent);
}

.dsa-pop-effort {
  margin-top: 9px;
  padding: 8px 7px 7px;
  border-top: 1px solid var(--dsa-line);
}

.dsa-pop-effort.is-pinned {
  margin: 6px 10px 0;
  padding: 7px 0 8px;
  border-top: 0;
  border-bottom: 1px solid var(--dsa-line);
}

.dsa-pop-effort-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
}

.dsa-pop-effort-label {
  color: var(--dsa-muted);
  font-family: var(--dsa-mono);
  font-size: 9.5px;
  letter-spacing: 0.04em;
}

.dsa-pop-effort-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.dsa-chip {
  min-height: 23px;
  padding: 3px 7px;
  border: 1px solid var(--dsa-line);
  border-radius: 5px;
  background: transparent;
  color: var(--dsa-muted);
  font: inherit;
  font-size: 10px;
  line-height: 1.2;
  cursor: pointer;
}

.dsa-chip:hover {
  border-color: var(--dsa-line-strong);
  color: var(--dsa-paper);
}

.dsa-chip.is-selected {
  border-color: rgba(130, 155, 255, 0.52);
  background: var(--dsa-accent-soft);
  color: #cdd7ff;
}

.dsa-chip:disabled {
  opacity: 0.55;
  cursor: default;
}

.dsa-chip:focus-visible {
  outline: 2px solid var(--dsa-accent);
  outline-offset: 1px;
}

.dsa-pop-slot {
  margin-top: 7px;
  padding-top: 7px;
  border-top: 1px solid var(--dsa-line);
}

.dsa-pop-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  border-top: 1px solid var(--dsa-line);
  background: rgba(0, 0, 0, 0.1);
}

.dsa-pop-atlas {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  padding: 5px 4px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: var(--dsa-muted);
  font: inherit;
  font-size: 11px;
  cursor: pointer;
}

.dsa-pop-atlas:hover {
  color: var(--dsa-paper);
  background: rgba(255, 255, 255, 0.035);
}

.dsa-pop-atlas:focus-visible {
  outline: 2px solid var(--dsa-accent);
  outline-offset: 1px;
}

.dsa-pop-atlas-mark {
  display: inline-flex;
  color: #7f96f6;
}

.dsa-pop-atlas-text {
  flex: 1;
  text-align: left;
}

.dsa-pop-atlas-hint {
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 9.5px;
  letter-spacing: 0.06em;
}

.dsa-pop-empty {
  padding: 22px 10px;
  color: var(--dsa-muted-2);
  font-size: 10px;
  text-align: center;
}

/* ── atlas overlay ─────────────────────────────────────────────── */
.dsa-root {
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  pointer-events: auto;
  color: var(--dsa-paper);
  color-scheme: dark;
  font-family: var(--dsa-sans);
  -webkit-font-smoothing: antialiased;
}

.dsa-backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 75% 60% at 50% 0%, rgba(74, 118, 210, 0.24), transparent 62%),
    radial-gradient(ellipse 45% 40% at 85% 100%, rgba(20, 78, 138, 0.2), transparent 62%),
    rgba(1, 6, 16, 0.76);
  backdrop-filter: blur(14px) saturate(1.05);
  -webkit-backdrop-filter: blur(14px) saturate(1.05);
  animation: dsa-fade-in 180ms ease both;
}

.dsa-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(1240px, calc(100vw - 40px));
  height: auto;
  max-height: calc(100vh - 40px);
  overflow: hidden;
  border: 1px solid rgba(196, 216, 255, 0.22);
  border-radius: 18px;
  background:
    linear-gradient(128deg, rgba(255, 255, 255, 0.075), transparent 26%, transparent 72%, rgba(143, 176, 255, 0.055)),
    radial-gradient(ellipse 80% 65% at 50% -18%, rgba(204, 224, 255, 0.16), transparent 58%),
    radial-gradient(ellipse 60% 50% at 100% 0%, rgba(77, 107, 254, 0.22), transparent 55%),
    radial-gradient(ellipse 55% 45% at 0% 100%, rgba(20, 80, 150, 0.18), transparent 60%),
    linear-gradient(165deg, rgba(10, 30, 54, 0.88) 0%, rgba(4, 11, 22, 0.94) 100%);
  backdrop-filter: blur(26px) saturate(1.2);
  -webkit-backdrop-filter: blur(26px) saturate(1.2);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    inset 0 0 0 1px rgba(255, 255, 255, 0.025),
    0 40px 120px rgba(0, 0, 0, 0.66),
    0 0 90px rgba(77, 107, 254, 0.12);
  animation: dsa-panel-in 260ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  outline: none;
}

/* 深海蓝玻璃高光：顶部一层白色炫光，底部一层深蓝反光。 */
.dsa-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 16%),
    radial-gradient(ellipse 48% 26% at 50% -4%, rgba(232, 241, 255, 0.18), transparent 72%);
  opacity: 0.85;
}

.dsa-grid-texture {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.55;
  background-image:
    linear-gradient(to right, rgba(151, 169, 196, 0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(151, 169, 196, 0.03) 1px, transparent 1px);
  background-size: 34px 34px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent 72%);
}

.dsa-head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 22px 26px 15px;
  border-bottom: 1px solid rgba(190, 214, 255, 0.12);
}

.dsa-brand {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  min-width: 0;
}

.dsa-brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex: none;
  border: 1px solid rgba(130, 155, 255, 0.34);
  border-radius: 11px;
  background: linear-gradient(145deg, rgba(130, 155, 255, 0.16), rgba(130, 155, 255, 0.035));
  color: #9eb0ff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.dsa-brand-copy {
  min-width: 0;
}

.dsa-kicker {
  margin-bottom: 4px;
  color: #8fa5ff;
  font-family: var(--dsa-mono);
  font-size: 8.5px;
  letter-spacing: 0.13em;
}

.dsa-title {
  margin: 0;
  color: #f4f8ff;
  font-family: var(--dsa-display);
  font-size: 31px;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.06;
  text-shadow: 0 0 34px rgba(190, 216, 255, 0.22);
}

.dsa-subtitle {
  margin: 6px 0 0;
  color: var(--dsa-muted);
  font-size: 10.5px;
  line-height: 1.45;
}

.dsa-head-actions {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: none;
}

.dsa-live {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  border: 1px solid var(--dsa-line);
  border-radius: 7px;
  background: rgba(4, 8, 14, 0.32);
  color: var(--dsa-muted);
  font-family: var(--dsa-mono);
  font-size: 8.5px;
  white-space: nowrap;
}

.dsa-live-dot {
  width: 5px;
  height: 5px;
  flex: none;
  border-radius: 50%;
  background: var(--dsa-ok);
  box-shadow: 0 0 0 3px rgba(116, 217, 173, 0.09);
}

.dsa-live-dot.is-loading {
  background: var(--dsa-warn);
  box-shadow: 0 0 0 3px rgba(240, 190, 103, 0.09);
  animation: dsa-pulse 1.2s ease-in-out infinite;
}

.dsa-live-divider {
  width: 1px;
  height: 9px;
  background: var(--dsa-line-strong);
}

.dsa-live-current {
  color: var(--dsa-muted-2);
  max-width: 190px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dsa-sync {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 8px;
  border: 1px solid var(--dsa-line);
  border-radius: 7px;
  background: rgba(4, 8, 14, 0.32);
  color: var(--dsa-muted);
  font-family: var(--dsa-mono);
  font-size: 8.5px;
  white-space: nowrap;
  cursor: pointer;
  transition: border-color 140ms ease, color 140ms ease, background 140ms ease;
}

.dsa-sync:hover {
  border-color: var(--dsa-line-strong);
  background: rgba(255, 255, 255, 0.035);
  color: var(--dsa-paper);
}

.dsa-sync:disabled {
  cursor: default;
  opacity: 0.72;
}

.dsa-sync-dot {
  width: 5px;
  height: 5px;
  flex: none;
  border-radius: 50%;
  background: var(--dsa-muted-2);
}

.dsa-sync.is-live .dsa-sync-dot {
  background: var(--dsa-ok);
  box-shadow: 0 0 0 3px rgba(116, 217, 173, 0.09);
}

.dsa-sync.is-stale .dsa-sync-dot {
  background: var(--dsa-warn);
}

.dsa-sync.is-fallback .dsa-sync-dot {
  background: var(--dsa-muted-2);
}

.dsa-sync.is-busy .dsa-sync-dot {
  background: var(--dsa-accent);
  animation: dsa-pulse 1.1s ease-in-out infinite;
}

.dsa-sync-time {
  color: var(--dsa-muted-2);
}

.dsa-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex: none;
  border: 1px solid var(--dsa-line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  color: var(--dsa-muted);
  cursor: pointer;
}

.dsa-close:hover {
  border-color: var(--dsa-line-strong);
  background: rgba(255, 255, 255, 0.055);
  color: var(--dsa-paper);
}

.dsa-close:focus-visible {
  outline: 2px solid var(--dsa-accent);
  outline-offset: 2px;
}

.dsa-main {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
  padding-top: 11px;
}

.dsa-ledger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 0 24px 10px;
}

.dsa-years {
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
}

.dsa-year {
  display: inline-flex;
  align-items: baseline;
  gap: 5px;
  padding: 5px 9px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  cursor: pointer;
  transition: background 140ms ease, color 140ms ease, border-color 140ms ease;
}

.dsa-year:hover {
  background: rgba(255, 255, 255, 0.035);
  color: var(--dsa-muted);
}

.dsa-year.is-active {
  border-color: rgba(130, 155, 255, 0.24);
  background: var(--dsa-accent-soft);
  color: var(--dsa-paper);
}

.dsa-year:focus-visible {
  outline: 2px solid var(--dsa-accent);
  outline-offset: 1px;
}

.dsa-year-number {
  font-size: 11.5px;
  letter-spacing: 0.02em;
}

.dsa-year-count {
  color: var(--dsa-muted-2);
  font-size: 9px;
}

.dsa-year.is-active .dsa-year-count {
  color: #9eb0ff;
}

.dsa-legend {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: none;
  color: var(--dsa-muted-2);
  font-size: 9.5px;
}

.dsa-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

.dsa-legend-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.dsa-legend-dot.is-available { background: var(--dsa-ok); box-shadow: 0 0 0 2px rgba(116, 217, 173, 0.09); }
.dsa-legend-dot.is-current { background: var(--dsa-accent); box-shadow: 0 0 0 2px rgba(130, 155, 255, 0.16); }
.dsa-legend-dot.is-archive { border: 1px solid var(--dsa-slate, #728099); background: transparent; }
.dsa-legend-dot.is-forecast { border: 1px dashed #8b98ad; background: transparent; }

.dsa-banner {
  margin: 0 24px 7px;
  padding: 5px 8px;
  border: 1px solid rgba(240, 190, 103, 0.2);
  border-radius: 5px;
  background: rgba(240, 190, 103, 0.055);
  color: #cdb88d;
  font-size: 9.5px;
  line-height: 1.4;
}

.dsa-months {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 4px;
  padding: 0 24px 9px;
}

.dsa-month-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 0;
  height: 27px;
  padding: 0 3px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  cursor: pointer;
  transition: background 140ms ease, border-color 140ms ease, color 140ms ease;
}

.dsa-month-pill:hover {
  border-color: var(--dsa-line);
  background: rgba(255, 255, 255, 0.035);
  color: var(--dsa-paper);
}

.dsa-month-pill.is-active {
  border-color: rgba(130, 155, 255, 0.34);
  background: var(--dsa-accent-soft);
  color: #dbe3ff;
}

.dsa-month-pill.is-now {
  box-shadow: inset 0 -1px 0 rgba(116, 217, 173, 0.55);
}

.dsa-month-pill:disabled {
  opacity: 0.28;
  cursor: default;
}

.dsa-month-pill:disabled:hover {
  border-color: transparent;
  background: transparent;
  color: var(--dsa-muted-2);
}

.dsa-month-pill:focus-visible {
  outline: 2px solid var(--dsa-accent);
  outline-offset: 1px;
}

.dsa-month-pill-num {
  font-size: 9px;
  letter-spacing: 0.02em;
}

.dsa-month-pill-count {
  color: var(--dsa-muted-2);
  font-size: 7.5px;
  opacity: 0.85;
}

.dsa-month-pill.is-active .dsa-month-pill-count {
  color: #9eb0ff;
}

.dsa-month-dot {
  width: 3px;
  height: 3px;
  flex: none;
  border-radius: 50%;
  background: var(--dsa-ok);
  box-shadow: 0 0 6px rgba(52, 211, 153, 0.65);
}

.dsa-calendar-wrap {
  min-height: 0;
  flex: 1;
  overflow: auto;
  padding: 0 22px 6px;
  overscroll-behavior: contain;
}

.dsa-calendar {
  display: flex;
  flex-direction: column;
  width: min(100%, 1120px);
  margin: 0 auto;
  gap: 6px;
  min-width: 600px;
  animation: dsa-cal-in 220ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.dsa-cal-caption {
  display: flex;
  align-items: baseline;
  gap: 7px;
  min-height: 22px;
  padding: 2px 2px 0;
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 9px;
}

.dsa-cal-month {
  color: #aab6c9;
  font-size: 12px;
  font-weight: 520;
}

.dsa-cal-cn {
  color: #b9c3d5;
  font-size: 10px;
}

.dsa-cal-year {
  color: var(--dsa-muted-2);
  font-size: 9px;
}

.dsa-cal-count {
  margin-left: auto;
  color: var(--dsa-muted-2);
  font-size: 8.5px;
}

.dsa-cal-count strong {
  color: #9eb0ff;
  font-weight: 500;
}

.dsa-weekdays {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 6px;
  height: 17px;
}

.dsa-weekday {
  padding-left: 5px;
  border-left: 1px solid var(--dsa-line);
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 8.5px;
  letter-spacing: 0.05em;
}

.dsa-weekday.is-weekend {
  color: #9aa9c8;
}

.dsa-days {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-auto-rows: minmax(52px, 66px);
  gap: 6px;
}

.dsa-day {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 52px;
  padding: 4px 4px 3px;
  overflow: hidden;
  border: 1px solid rgba(151, 169, 196, 0.085);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.012);
  transition: transform 140ms ease, border-color 140ms ease, background 140ms ease, box-shadow 140ms ease;
}

.dsa-day.is-weekend {
  background: rgba(255, 255, 255, 0.018);
}

.dsa-day.is-outside {
  opacity: 0.2;
  pointer-events: none;
}

.dsa-day.has-release {
  border-color: var(--dsa-day-border);
  background:
    radial-gradient(ellipse 120% 90% at 50% 0%, var(--dsa-day-wash), transparent 70%),
    rgba(255, 255, 255, 0.014);
}

.dsa-day.has-release::after {
  content: "";
  position: absolute;
  inset: 0 8px auto;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--dsa-day-tone), transparent);
  opacity: 0.6;
}

.dsa-day.has-release:hover {
  z-index: 2;
  border-color: var(--dsa-day-tone);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.3);
  transform: translateY(-1px);
}

.dsa-day.is-today {
  border-color: rgba(130, 155, 255, 0.3);
}

.dsa-day-head {
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 13px;
  margin-bottom: 3px;
}

.dsa-day-num {
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 8.5px;
  letter-spacing: 0.03em;
}

.dsa-day.has-release .dsa-day-num {
  color: var(--dsa-day-tone);
}

.dsa-day.is-today .dsa-day-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 15px;
  height: 13px;
  padding: 0 3px;
  border-radius: 4px;
  background: var(--dsa-accent-soft);
  color: #c6d1ff;
}

.dsa-day-today {
  margin-left: auto;
  color: #9eb0ff;
  font-family: var(--dsa-mono);
  font-size: 7px;
  letter-spacing: 0.04em;
}

.dsa-day-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  min-height: 0;
}

.dsa-day-body.is-dense {
  gap: 1px;
}

.dsa-day-empty {
  align-self: center;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: rgba(151, 169, 196, 0.22);
}

.dsa-release {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  min-width: 0;
  height: 17px;
  padding: 0 5px;
  overflow: hidden;
  border: 1px solid var(--dsa-tone-border);
  border-radius: 5px;
  background: var(--dsa-tone-bg);
  color: var(--dsa-paper);
  text-align: left;
  cursor: pointer;
  animation: dsa-release-in 240ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  transition: transform 120ms ease, border-color 120ms ease, filter 120ms ease, background 120ms ease;
}

.dsa-release:hover,
.dsa-release.is-focused {
  z-index: 2;
  border-color: var(--dsa-tone);
  background: var(--dsa-tone-bg);
  filter: brightness(1.12);
  transform: translateX(1px);
}

.dsa-release.is-focused {
  box-shadow: 0 0 0 1px var(--dsa-tone);
}

.dsa-release:focus-visible {
  outline: 2px solid var(--dsa-paper);
  outline-offset: 1px;
}

.dsa-release.is-forecast {
  border-style: dashed;
  background: rgba(255, 255, 255, 0.012);
}

.dsa-release.is-archive {
  filter: saturate(0.75);
}

.dsa-release-symbol {
  flex: none;
  color: var(--dsa-tone);
  font-family: "Bahnschrift", "Aptos Display", "Segoe UI", sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
  white-space: nowrap;
}

.dsa-release-name {
  min-width: 0;
  overflow: hidden;
  color: rgba(233, 238, 248, 0.78);
  font-size: 8px;
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsa-release-dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4px;
  height: 4px;
  flex: none;
  margin-left: auto;
  border-radius: 50%;
}

.dsa-release-dot.is-available { background: var(--dsa-ok); }
.dsa-release-dot.is-current { width: 9px; height: 9px; background: var(--dsa-tone); color: #071018; }
.dsa-release-dot.is-archive { border: 1px solid #728099; }
.dsa-release-dot.is-forecast { border: 1px dashed #8b98ad; }

.dsa-day-body.is-dense .dsa-release {
  height: 14px;
  padding: 0 4px;
}

.dsa-day-body.is-dense .dsa-release-name {
  font-size: 7.5px;
}

.dsa-release.is-solo {
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  min-height: 38px;
  padding: 2px 4px;
  border-radius: 7px;
  text-align: center;
}

.dsa-release.is-solo .dsa-release-symbol {
  font-size: 20px;
  line-height: 1;
}

.dsa-release.is-solo .dsa-release-name {
  max-width: 100%;
  color: rgba(233, 238, 248, 0.86);
  font-size: 8.5px;
}

.dsa-release.is-solo .dsa-release-dot {
  position: absolute;
  top: 4px;
  right: 4px;
  margin-left: 0;
}

.dsa-release.is-solo.is-focused {
  transform: translateY(-1px);
  box-shadow: 0 0 0 1px var(--dsa-tone), 0 0 22px rgba(130, 155, 255, 0.14);
}

.dsa-press-ring {
  position: fixed;
  z-index: 100001;
  transform: translate(-50%, -50%);
  overflow: visible;
  opacity: 0;
  pointer-events: none;
  transition: opacity 120ms ease;
}

.dsa-press-ring.is-running {
  opacity: 1;
}

.dsa-press-ring svg {
  display: block;
  width: 100%;
  height: 100%;
}

.dsa-press-ring path {
  fill: none;
  stroke-width: 2.2;
}

.dsa-press-ring-track {
  stroke: rgba(151, 169, 196, 0.32);
}

.dsa-press-ring-fill {
  stroke: #a8b8ff;
  stroke-linecap: round;
  filter: drop-shadow(0 0 3px rgba(130, 155, 255, 0.65));
  transition: stroke-dashoffset 500ms linear;
}

.dsa-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0 0 4px;
}

.dsa-tag {
  padding: 1px 6px;
  border: 1px solid var(--dsa-line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.02);
  color: var(--dsa-muted);
  font-size: 8.5px;
  line-height: 1.5;
  white-space: nowrap;
}

.dsa-official {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 3px 10px;
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1px dashed var(--dsa-line);
  font-family: var(--dsa-mono);
  font-size: 8.5px;
  line-height: 1.5;
}

.dsa-official-label {
  color: #9eb0ff;
  letter-spacing: 0.05em;
}

.dsa-official-version {
  color: rgba(233, 238, 248, 0.82);
}

.dsa-official-price {
  color: #d8c79a;
}

.dsa-official-note {
  color: var(--dsa-muted-2);
}

.dsa-official-link {
  color: #9eb0ff;
  text-decoration: none;
}

.dsa-official-link:hover {
  text-decoration: underline;
}

.dsa-mobile {
  display: none;
}

.dsa-mobile-years {
  display: none;
}

.dsa-mobile-year {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 0 7px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 9px;
  cursor: pointer;
}

.dsa-mobile-year.is-active {
  border-color: rgba(130, 155, 255, 0.3);
  background: var(--dsa-accent-soft);
  color: #dbe3ff;
}

.dsa-mobile-year span {
  color: var(--dsa-muted-2);
  font-size: 7.5px;
}

.dsa-mobile-year.is-active span {
  color: #9eb0ff;
}

.dsa-mobile-filters {
  display: flex;
  gap: 4px;
  padding-bottom: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}

.dsa-mobile-filters::-webkit-scrollbar {
  display: none;
}

.dsa-mobile-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: none;
  height: 26px;
  padding: 0 8px;
  border: 1px solid var(--dsa-line);
  border-radius: 999px;
  background: transparent;
  color: var(--dsa-muted);
  font: inherit;
  font-size: 9.5px;
  cursor: pointer;
}

.dsa-mobile-chip.is-active {
  border-color: rgba(130, 155, 255, 0.4);
  background: var(--dsa-accent-soft);
  color: #dbe3ff;
}

.dsa-mobile-chip:disabled {
  opacity: 0.3;
  cursor: default;
}

.dsa-mobile-chip:focus-visible {
  outline: 2px solid var(--dsa-accent);
  outline-offset: 1px;
}

.dsa-mobile-chip-count {
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 8px;
}

.dsa-mobile-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.dsa-mobile-card {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) auto;
  align-items: center;
  gap: 9px;
  width: 100%;
  min-height: 48px;
  padding: 5px 7px;
  border: 1px solid var(--dsa-line);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.014);
  text-align: left;
  cursor: pointer;
  transition: border-color 140ms ease, background 140ms ease, transform 140ms ease;
}

.dsa-mobile-card:hover {
  border-color: var(--dsa-tone);
  background: rgba(255, 255, 255, 0.03);
}

.dsa-mobile-card.is-focused {
  border-color: var(--dsa-tone);
  box-shadow: 0 0 0 1px var(--dsa-tone);
}

.dsa-mobile-card:focus-visible {
  outline: 2px solid var(--dsa-paper);
  outline-offset: 1px;
}

.dsa-mobile-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--dsa-tone-border);
  border-radius: 7px;
  background: var(--dsa-tone-bg);
}

.dsa-mobile-no {
  position: absolute;
  top: 2px;
  left: 3px;
  color: var(--dsa-tone);
  font-family: var(--dsa-mono);
  font-size: 6.5px;
  opacity: 0.8;
}

.dsa-mobile-symbol {
  color: var(--dsa-tone);
  font-family: "Bahnschrift", "Aptos Display", "Segoe UI", sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
}

.dsa-mobile-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.dsa-mobile-name {
  overflow: hidden;
  color: #edf1f8;
  font-size: 11px;
  font-weight: 520;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsa-mobile-meta {
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 8px;
}

.dsa-mobile-tags {
  overflow: hidden;
  color: var(--dsa-muted-2);
  font-size: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsa-mobile-status {
  flex: none;
  padding: 2px 6px;
  border: 1px solid var(--dsa-line);
  border-radius: 999px;
  color: var(--dsa-muted);
  font-family: var(--dsa-mono);
  font-size: 7px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.dsa-mobile-status.is-current {
  border-color: rgba(130, 155, 255, 0.4);
  background: var(--dsa-accent-soft);
  color: #b9c7ff;
}

.dsa-mobile-status.is-available {
  border-color: rgba(116, 217, 173, 0.34);
  color: #9ce6c4;
}

.dsa-mobile-status.is-forecast {
  border-style: dashed;
  border-color: rgba(240, 190, 103, 0.34);
  color: #e3c58e;
}

.dsa-mobile-empty {
  padding: 22px 0;
  color: var(--dsa-muted-2);
  font-size: 10px;
  text-align: center;
}

.dsa-mobile-hint {
  padding-top: 7px;
  color: var(--dsa-muted-2);
  font-size: 8.5px;
  text-align: center;
}

/* ── detail slab ───────────────────────────────────────────────── */
.dsa-detail {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  margin: 10px 22px 17px;
  padding: 12px 14px;
  border: 1px solid var(--dsa-line-strong);
  border-radius: 14px;
  background: linear-gradient(90deg, var(--dsa-detail-wash), rgba(255, 255, 255, 0.018));
  min-height: 106px;
}

.dsa-detail::before {
  content: "";
  position: absolute;
  top: 14px;
  bottom: 14px;
  left: 0;
  width: 2px;
  border-radius: 2px;
  background: var(--dsa-detail-tone);
  opacity: 0.85;
}

.dsa-detail-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 64px;
  border: 1px solid var(--dsa-line-strong);
  border-radius: 9px;
  background: rgba(4, 8, 14, 0.35);
}

.dsa-detail-tile.is-current {
  border-color: var(--dsa-detail-tone);
  box-shadow: 0 0 0 1px var(--dsa-detail-tone);
}

.dsa-detail-no {
  position: absolute;
  top: 4px;
  left: 5px;
  color: var(--dsa-detail-tone);
  font-family: var(--dsa-mono);
  font-size: 7px;
  opacity: 0.75;
}

.dsa-detail-symbol {
  color: var(--dsa-detail-tone);
  font-family: "Bahnschrift", "Aptos Display", "Segoe UI", sans-serif;
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -0.04em;
}

.dsa-detail-copy {
  min-width: 0;
}

.dsa-detail-meta {
  color: var(--dsa-detail-tone);
  font-family: var(--dsa-mono);
  font-size: 9px;
  letter-spacing: 0.035em;
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dsa-detail-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 3px 0 2px;
  min-width: 0;
}

.dsa-detail-title {
  margin: 0;
  min-width: 0;
  flex: 0 1 auto;
  overflow: hidden;
  color: #f0f4fb;
  font-family: var(--dsa-display);
  font-size: 21px;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.15;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsa-badge {
  flex: none;
  padding: 2px 6px;
  border: 1px solid var(--dsa-line);
  border-radius: 999px;
  color: var(--dsa-muted);
  font-family: var(--dsa-mono);
  font-size: 8.5px;
  letter-spacing: 0.06em;
  line-height: 1.4;
  text-transform: uppercase;
}

.dsa-badge.is-current {
  border-color: rgba(130, 155, 255, 0.4);
  background: var(--dsa-accent-soft);
  color: #b9c7ff;
}

.dsa-badge.is-available {
  border-color: rgba(116, 217, 173, 0.34);
  color: #9ce6c4;
}

.dsa-badge.is-forecast {
  border-style: dashed;
  border-color: rgba(240, 190, 103, 0.34);
  color: #e3c58e;
}

.dsa-badge.is-soft {
  border-color: var(--dsa-line);
  color: var(--dsa-muted-2);
}

.dsa-detail-summary {
  margin: 2px 0 4px;
  display: -webkit-box;
  overflow: hidden;
  color: var(--dsa-muted);
  font-size: 10px;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.dsa-specs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.dsa-spec {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
}

.dsa-spec-key {
  color: var(--dsa-muted-2);
  font-size: 9px;
}

.dsa-spec-value {
  color: rgba(233, 238, 248, 0.8);
  font-family: var(--dsa-mono);
  font-size: 9px;
}

.dsa-detail-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  min-width: 258px;
  max-width: 316px;
}

.dsa-effort-block {
  display: flex;
  align-items: center;
  gap: 7px;
  max-width: 100%;
}

.dsa-effort-label {
  flex: none;
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 9px;
  letter-spacing: 0.04em;
}

.dsa-effort-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 3px;
}

.dsa-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 31px;
  padding: 5px 12px;
  border: 1px solid transparent;
  border-radius: 7px;
  background: #899fff;
  color: #071018;
  font: inherit;
  font-size: 10.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 140ms ease, opacity 140ms ease;
}

.dsa-cta:hover {
  background: #a5b6ff;
}

.dsa-cta:disabled {
  border-color: var(--dsa-line);
  background: rgba(255, 255, 255, 0.045);
  color: var(--dsa-muted-2);
  cursor: default;
}

.dsa-cta:focus-visible {
  outline: 2px solid var(--dsa-paper);
  outline-offset: 2px;
}

.dsa-detail-error {
  max-width: 290px;
  color: #ffb9c3;
  font-size: 9.5px;
  line-height: 1.4;
  text-align: right;
}

.dsa-hint {
  max-width: 290px;
  color: var(--dsa-muted-2);
  font-size: 9.5px;
  line-height: 1.4;
  text-align: right;
}

/* ── dual view + bento / compare ─────────────────────────────── */
.dsa-noise {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0.34;
  background-image: radial-gradient(rgba(255, 255, 255, 0.11) 0.5px, transparent 0.6px);
  background-size: 3px 3px;
  mix-blend-mode: soft-light;
}

.dsa-view-switch {
  display: inline-flex;
  padding: 2px;
  border: 1px solid var(--dsa-line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.025);
}

.dsa-view-switch button {
  height: 23px;
  padding: 0 8px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 8.5px;
  cursor: pointer;
  transition: background 140ms ease, color 140ms ease;
}

.dsa-view-switch button.is-active {
  background: var(--dsa-accent-soft);
  color: #e3e9ff;
}

.dsa-compare-toggle {
  height: 27px;
  padding: 0 9px;
  border: 1px solid var(--dsa-line);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.025);
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 8.5px;
  cursor: pointer;
  transition: border-color 140ms ease, color 140ms ease, background 140ms ease;
}

.dsa-compare-toggle.is-on {
  border-color: rgba(130, 155, 255, 0.55);
  background: var(--dsa-accent-soft);
  color: #e3e9ff;
}

.dsa-periodic-view {
  flex: 0 1 auto;
  min-height: 0;
  max-height: min(52vh, 560px);
  overflow: auto;
  padding: 2px 24px 6px;
  scrollbar-width: thin;
  animation: dsa-view-in 280ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.dsa-periodic-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  padding: 2px 2px 10px;
}

.dsa-periodic-kicker {
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 8px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.dsa-periodic-title {
  margin-top: 3px;
  color: #e9eefb;
  font-family: var(--dsa-serif);
  font-size: 17px;
  font-weight: 500;
}

.dsa-periodic-meta {
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 8.5px;
  text-align: right;
}

.dsa-periodic-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 13px;
  align-items: start;
}

.dsa-family-col {
  min-width: 0;
}

.dsa-family-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 2px 7px;
  color: var(--dsa-tone);
  font-family: var(--dsa-mono);
  font-size: 8px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.dsa-family-head::before {
  content: "";
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--dsa-tone);
  box-shadow: 0 0 8px var(--dsa-tone);
}

.dsa-family-head strong {
  color: rgba(233, 238, 248, 0.82);
  font-weight: 500;
}

.dsa-family-head span {
  margin-left: auto;
  color: var(--dsa-muted-2);
  font-size: 7.5px;
}

.dsa-family-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 7px;
}

.dsa-family-list.is-single {
  grid-template-columns: 1fr;
}

.dsa-ptile {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  min-height: 118px;
  padding: 12px 11px 11px;
  overflow: hidden;
  border: 1px solid var(--dsa-tone-border);
  border-top-color: rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  background:
    radial-gradient(ellipse 120% 100% at 0% 0%, rgba(255, 255, 255, 0.06), transparent 62%),
    var(--dsa-tone-bg);
  color: var(--dsa-paper);
  text-align: left;
  cursor: pointer;
  transform: perspective(700px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition:
    transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 180ms ease,
    box-shadow 180ms ease,
    filter 180ms ease;
  animation: dsa-ptile-in 320ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.dsa-ptile::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(
    circle at var(--mx, 50%) var(--my, 50%),
    rgba(255, 255, 255, 0.16),
    transparent 58%
  );
  transition: opacity 180ms ease;
}

.dsa-ptile::after {
  content: attr(data-tip);
  position: absolute;
  left: 7px;
  right: 7px;
  bottom: 7px;
  z-index: 3;
  padding: 6px 7px;
  border: 1px solid var(--dsa-line);
  border-radius: 6px;
  background: rgba(3, 10, 20, 0.94);
  color: #cfdaee;
  font-family: var(--dsa-mono);
  font-size: 7.5px;
  line-height: 1.5;
  text-align: left;
  white-space: normal;
  opacity: 0;
  transform: translateY(2px);
  pointer-events: none;
  transition: opacity 120ms ease 200ms, transform 120ms ease 200ms;
}

.dsa-ptile:hover::before,
.dsa-ptile:focus-visible::before {
  opacity: 1;
}

.dsa-ptile:hover::after,
.dsa-ptile:focus-visible::after {
  opacity: 1;
  transform: translateY(0);
}

.dsa-ptile:hover,
.dsa-ptile:focus-visible {
  z-index: 2;
  border-color: var(--dsa-tone);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  filter: brightness(1.05);
}

.dsa-ptile:focus-visible {
  outline: 2px solid var(--dsa-tone);
  outline-offset: 2px;
}

.dsa-ptile.is-focused {
  border-color: var(--dsa-tone);
  box-shadow: 0 0 0 1px var(--dsa-tone), 0 0 26px var(--dsa-tone-bg);
}

.dsa-ptile.is-forecast {
  border-style: dashed;
  background: rgba(255, 255, 255, 0.018);
}

.dsa-ptile.is-compared {
  border-color: var(--dsa-tone);
}

.dsa-ptile-no {
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 7.5px;
  letter-spacing: 0.03em;
}

.dsa-ptile-symbol {
  margin-top: 3px;
  color: var(--dsa-tone);
  font-family: "Bahnschrift", "Aptos Display", "Segoe UI", sans-serif;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.06em;
  line-height: 1;
  text-shadow: 0 0 24px var(--dsa-tone-bg);
}

.dsa-ptile-name {
  display: block;
  width: 100%;
  margin-top: 5px;
  overflow: hidden;
  color: rgba(233, 238, 248, 0.84);
  font-size: 9.5px;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsa-ptile-version {
  display: block;
  width: calc(100% - 14px);
  overflow: hidden;
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 7px;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsa-ptile-dot {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.dsa-ptile-dot.is-available {
  background: var(--dsa-ok);
  box-shadow: 0 0 9px rgba(52, 211, 153, 0.7);
}

.dsa-ptile-dot.is-current {
  background: #eef3ff;
  box-shadow: 0 0 12px rgba(223, 231, 255, 0.95);
  animation: dsa-pulse 2.4s ease-in-out infinite;
}

.dsa-ptile-dot.is-archive {
  background: #6b7a91;
}

.dsa-ptile-dot.is-forecast {
  border: 1px dashed #8b98ad;
}

.dsa-ptile-compare {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 4px;
  border-radius: 4px;
  background: var(--dsa-tone);
  color: #071018;
  font-family: var(--dsa-mono);
  font-size: 6.5px;
  line-height: 1;
}

.dsa-detail.dsa-bento {
  display: grid;
  grid-template-columns: minmax(270px, 0.9fr) minmax(320px, 1.2fr) 250px;
  gap: 12px;
  align-items: stretch;
  padding: 13px 15px;
}

.dsa-bento-id {
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
  min-width: 0;
}

.dsa-bento-id .dsa-detail-title-row {
  margin-top: 4px;
}

.dsa-bento-id .dsa-detail-summary {
  margin-top: 5px;
  -webkit-line-clamp: 2;
}

.dsa-bento-id .dsa-tags {
  margin-top: 6px;
}

.dsa-bento-metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  align-content: start;
  min-width: 0;
}

.dsa-metric {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  padding: 7px 8px;
  border: 1px solid var(--dsa-line);
  border-top-color: rgba(255, 255, 255, 0.12);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.025);
}

.dsa-metric-label {
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 7px;
  letter-spacing: 0.04em;
}

.dsa-metric-value {
  overflow: hidden;
  color: #edf3ff;
  font-family: var(--dsa-mono);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsa-metric-value.is-price {
  color: #c3d2ff;
  font-size: 8.5px;
}

.dsa-metric-note {
  color: var(--dsa-muted-2);
  font-size: 7.5px;
  line-height: 1.3;
}

.dsa-bento-controls {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
}

.dsa-bento-controls-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 7.5px;
}

.dsa-segmented {
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  padding: 3px;
  border: 1px solid var(--dsa-line);
  border-radius: 8px;
  background: rgba(2, 8, 18, 0.6);
}

.dsa-seg-thumb {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc((100% - 6px) / var(--dsa-seg-count, 4));
  border-radius: 6px;
  background: linear-gradient(180deg, rgba(130, 155, 255, 0.45), rgba(130, 155, 255, 0.2));
  box-shadow: 0 0 16px rgba(130, 155, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transform: translateX(calc(var(--dsa-seg-index, 0) * 100%));
  transition: transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.dsa-seg-btn {
  position: relative;
  z-index: 1;
  height: 25px;
  border: 0;
  background: transparent;
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 8.5px;
  cursor: pointer;
  transition: color 140ms ease;
}

.dsa-seg-btn.is-on {
  color: #eef3ff;
}

.dsa-seg-btn:disabled {
  opacity: 0.35;
  cursor: default;
}

.dsa-estimate {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 7.5px;
}

.dsa-estimate strong {
  color: #dbe4f8;
  font-weight: 500;
}

.dsa-compare {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 14px;
  min-height: 150px;
  padding: 14px 16px;
  background:
    radial-gradient(ellipse 80% 100% at 0% 0%, rgba(248, 113, 113, 0.06), transparent 70%),
    radial-gradient(ellipse 80% 100% at 100% 0%, rgba(52, 211, 153, 0.06), transparent 70%);
}

.dsa-detail.dsa-compare {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.dsa-compare-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 9px 10px;
  border: 1px solid var(--dsa-line);
  border-top-color: rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
}

.dsa-compare-head {
  display: flex;
  align-items: center;
  gap: 7px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--dsa-line);
}

.dsa-compare-symbol {
  color: var(--dsa-tone);
  font-family: "Bahnschrift", "Aptos Display", "Segoe UI", sans-serif;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.05em;
}

.dsa-compare-name {
  overflow: hidden;
  color: #e9eefb;
  font-size: 9.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsa-compare-note {
  padding: 4px 0 2px;
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 7px;
  letter-spacing: 0.04em;
}

.dsa-official-compact {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: nowrap;
  margin-top: 6px;
  overflow: hidden;
  font-size: 7.5px;
}

.dsa-official-compact .dsa-official-version {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsa-compare-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  padding: 3px 0;
  border-bottom: 1px solid rgba(151, 169, 196, 0.06);
  font-family: var(--dsa-mono);
  font-size: 7.5px;
}

.dsa-compare-row span:first-child {
  color: var(--dsa-muted-2);
}

.dsa-compare-row span:last-child {
  color: #dbe4f8;
  text-align: right;
}

.dsa-compare-win {
  color: #6ee7b7 !important;
}

.dsa-compare-lose {
  color: #fca5a5 !important;
}

.dsa-toast {
  position: absolute;
  top: 72px;
  left: 50%;
  z-index: 30;
  max-width: calc(100% - 40px);
  padding: 8px 12px;
  border: 1px solid rgba(190, 214, 255, 0.2);
  border-radius: 999px;
  background: rgba(4, 12, 24, 0.94);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  color: #edf3ff;
  font-family: var(--dsa-mono);
  font-size: 8.5px;
  white-space: nowrap;
  transform: translateX(-50%);
  animation: dsa-toast-in 260ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.dsa-live.is-flash {
  animation: dsa-island-pulse 900ms ease;
}

.dsa-shortcuts {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 22px 10px;
  color: var(--dsa-muted-2);
  font-family: var(--dsa-mono);
  font-size: 7.5px;
}

.dsa-kbd {
  padding: 1px 4px;
  border: 1px solid var(--dsa-line);
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.03);
  color: #b9c7dd;
}

@keyframes dsa-view-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes dsa-ptile-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes dsa-toast-in {
  from { opacity: 0; transform: translate(-50%, -5px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

@keyframes dsa-island-pulse {
  0% { box-shadow: 0 0 0 0 rgba(130, 155, 255, 0.4); }
  55% { box-shadow: 0 0 0 5px rgba(130, 155, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(130, 155, 255, 0); }
}

/* ── motion ────────────────────────────────────────────────────── */
@keyframes dsa-spin {
  to { transform: rotate(360deg); }
}

@keyframes dsa-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes dsa-panel-in {
  from { opacity: 0; transform: translateY(9px) scale(0.992); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes dsa-pop-in {
  from { opacity: 0; transform: translateY(4px) scale(0.988); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes dsa-tile-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes dsa-pulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}

/* ── responsive ────────────────────────────────────────────────── */
/* Short windows still show the whole month: six rows compress before scrolling. */
@media (max-height: 940px) {
  .dsa-calendar { height: auto; gap: 5px; }
  .dsa-days {
    flex: 0 0 auto;
    min-height: 0;
    grid-auto-rows: minmax(48px, 58px);
    gap: 5px;
  }
  .dsa-day { min-height: 48px; padding: 3px 4px 2px; }
  .dsa-day-head { margin-bottom: 2px; }
  .dsa-day-body.is-dense { gap: 1px; }
  .dsa-release.is-solo {
    height: auto;
    flex: none;
    min-height: 30px;
    margin: 1px 0;
  }
  .dsa-release.is-solo .dsa-release-symbol { font-size: 17px; }
  .dsa-periodic-view { max-height: min(58vh, 480px); }
  .dsa-periodic-grid { gap: 8px; }
  .dsa-ptile { min-height: 68px; padding: 4px 7px; }
  .dsa-ptile-symbol { font-size: 20px; }
  .dsa-ptile-version { font-size: 7.5px; }
  .dsa-family-list { gap: 6px; }
}

/* Short laptop windows: keep the full six-row month visible and compact. */
@media (max-height: 760px) {
  .dsa-calendar { width: min(100%, 960px); gap: 4px; }
  .dsa-days { grid-auto-rows: minmax(38px, 42px); gap: 4px; }
  .dsa-day { min-height: 38px; padding: 2px 3px 1px; }
  .dsa-day-head { margin-bottom: 1px; }
  .dsa-release.is-solo { min-height: 24px; margin: 0; }
  .dsa-release.is-solo .dsa-release-symbol { font-size: 15px; }
  .dsa-release.is-solo .dsa-release-name { font-size: 7.5px; }
}

@media (max-width: 1120px) {
  .dsa-title { font-size: 27px; }
  .dsa-live-current, .dsa-live-divider { display: none; }
  .dsa-sync-time { display: none; }
  .dsa-detail-actions { min-width: 226px; }
  .dsa-periodic-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .dsa-detail.dsa-bento { grid-template-columns: minmax(220px, 0.9fr) minmax(260px, 1.2fr); }
  .dsa-bento-controls { grid-column: 1 / -1; flex-direction: row; align-items: center; justify-content: space-between; }
  .dsa-bento-controls > .dsa-segmented { flex: 1; max-width: 360px; }
}

@media (max-width: 900px) {
  .dsa-root { padding: 10px; }
  .dsa-panel { width: calc(100vw - 20px); height: auto; max-height: calc(100vh - 20px); }
  .dsa-head { padding: 17px 18px 13px; gap: 12px; }
  .dsa-title { font-size: 24px; }
  .dsa-subtitle { font-size: 9.5px; }
  .dsa-brand-mark { width: 36px; height: 36px; }
  .dsa-ledger { padding: 0 18px 8px; }
  .dsa-months { padding: 0 18px 8px; }
  .dsa-calendar-wrap { padding: 0 16px 4px; }
  .dsa-banner { margin-left: 18px; margin-right: 18px; }
  .dsa-detail { margin: 8px 16px 13px; grid-template-columns: 50px minmax(0, 1fr); }
  .dsa-detail-tile { width: 50px; height: 56px; }
  .dsa-detail-symbol { font-size: 17px; }
  .dsa-detail-title { font-size: 19px; }
  .dsa-detail-actions { grid-column: 1 / -1; flex-direction: row; align-items: center; justify-content: space-between; min-width: 0; max-width: none; }
  .dsa-detail-actions .dsa-effort-block { flex-direction: column; align-items: flex-start; gap: 4px; }
  .dsa-detail-error, .dsa-hint { display: none; }
  .dsa-periodic-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .dsa-detail.dsa-bento { grid-template-columns: 1fr; }
  .dsa-bento-controls { grid-column: auto; flex-direction: column; }
  .dsa-bento-controls > .dsa-segmented { max-width: none; }
  .dsa-compare,
  .dsa-detail.dsa-compare { grid-template-columns: 1fr; }
}

@media (max-width: 760px) {
  .dsa-calendar-wrap, .dsa-months, .dsa-periodic-view { display: none; }
  .dsa-panel { overflow-y: auto; }
  .dsa-main { flex: none; }
  .dsa-mobile { display: flex; flex: none; flex-direction: column; min-height: 0; padding: 2px 16px 6px; }
  .dsa-mobile-years { display: flex; gap: 4px; padding-bottom: 6px; overflow-x: auto; scrollbar-width: none; }
  .dsa-mobile-list { flex: none; min-height: 0; max-height: none; overflow: visible; padding-right: 2px; }
  .dsa-view-switch button { padding: 0 6px; }
  .dsa-compare-toggle { padding: 0 7px; }
  .dsa-shortcuts { display: none; }
}

@media (max-width: 680px) {
  .dsa-root { padding: 0; }
  .dsa-panel { width: 100vw; height: 100vh; max-height: 100vh; border-radius: 0; border-left: 0; border-right: 0; }
  .dsa-head { padding: 15px 15px 11px; }
  .dsa-kicker { display: none; }
  .dsa-title { font-size: 21px; }
  .dsa-subtitle { display: none; }
  .dsa-head-actions .dsa-live { display: none; }
  .dsa-ledger { flex-direction: column; align-items: flex-start; gap: 5px; padding: 0 15px 8px; }
  .dsa-legend { display: none; }
  .dsa-mobile { padding: 0 12px 4px; }
  .dsa-mobile-list { max-height: none; }
  .dsa-detail { margin: 7px 12px 11px; }
  .dsa-detail-title { font-size: 18px; }
  .dsa-detail-summary { font-size: 9.5px; }
  .dsa-detail-actions { flex-wrap: wrap; }
  .dsa-cta { margin-left: auto; }
  .dsa-sync-text { display: none; }
  .dsa-sync { padding: 5px 6px; }
  .dsa-official { font-size: 8px; }
}

@keyframes dsa-cal-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes dsa-release-in {
  from { opacity: 0; transform: translateY(3px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .dsa-backdrop,
  .dsa-panel,
  .dsa-pop,
  .dsa-calendar,
  .dsa-release,
  .dsa-periodic-view,
  .dsa-ptile,
  .dsa-toast,
  .dsa-live.is-flash,
  .dsa-live-dot.is-loading,
  .dsa-spinner {
    animation: none !important;
  }
  .dsa-chevron,
  .dsa-trigger,
  .dsa-cta,
  .dsa-day,
  .dsa-release,
  .dsa-ptile,
  .dsa-seg-thumb {
    transition: none !important;
  }
  .dsa-press-ring-fill {
    transition: none !important;
    stroke-dashoffset: 0;
  }
}
`;

    function pad2(value) {
      return String(value).padStart(2, '0');
    }

    function yearOf(month) {
      return Number(String(month).slice(0, 4));
    }

    function formatDate(record) {
      if (!record) return '';
      const [year, month] = String(record.month).split('-');
      return record.day === undefined ? `${year}.${month}` : `${year}.${month}.${pad2(record.day)}`;
    }

    const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

    function daysInMonth(year, monthIndex) {
      return new Date(year, monthIndex + 1, 0).getDate();
    }

    function firstWeekday(year, monthIndex) {
      // JS Sunday = 0; the almanac week starts on Monday.
      return (new Date(year, monthIndex, 1).getDay() + 6) % 7;
    }

    function formatContext(value) {
      if (!value || typeof value !== 'number') return '—';
      if (value >= 1000000) return `${Number((value / 1000000).toFixed(1))}M`;
      if (value >= 1000) return `${Math.round(value / 1000)}K`;
      return String(value);
    }

    function normalizeModelKey(value) {
      return String(value || '')
        .toLowerCase()
        .replace(/^deepseek[-_\s]*/, '')
        .replace(/[^a-z0-9.]/g, '');
    }

    function isDeepSeekGroup(group) {
      return /deepseek/i.test(`${group && group.id ? group.id : ''} ${group && group.name ? group.name : ''}`);
    }

    function isDeepSeekModel(group, model) {
      if (isDeepSeekGroup(group)) return true;
      return /deepseek/i.test(`${model && model.id ? model.id : ''} ${model && model.name ? model.name : ''}`);
    }

    function providerName(group) {
      if (!group) return '';
      if (group.id === 'deepseek-account') return 'DeepSeek 账户';
      return group.name || group.id || '';
    }

    function modelDisplayName(model) {
      if (!model) return '';
      const raw = String(model.name || model.id || '');
      if (!raw) return '';
      // Account catalogs can expose the raw date-suffixed id as the display
      // name. Prefer the archive's human name when this is a DeepSeek model we
      // can identify; leave every other provider untouched.
      const archive = archiveFor(model);
      if (archive && /deepseek/i.test(`${model.id || ''} ${raw}`)) return archive.name;
      return raw;
    }

    function inferLane(model) {
      const text = `${model && model.id ? model.id : ''} ${model && model.name ? model.name : ''}`.toLowerCase();
      if (/reason|think/.test(text)) return 'reasoning';
      if (/flash|lite|mini|small|fast/.test(text)) return 'flash';
      if (/coder|code|vl|vision|math|ocr|agent/.test(text)) return 'special';
      return 'flagship';
    }

    function pickRuntime(record, current) {
      if (!record || !record.runtimes || record.runtimes.length === 0) return null;
      if (current) {
        const exact = record.runtimes.find((entry) =>
          entry.group && entry.group.id === current.provider && entry.model && entry.model.id === current.model);
        if (exact) return exact;
      }
      return record.runtimes[0];
    }

    function hasRuntime(record) {
      return !!(record && record.runtimes && record.runtimes.length);
    }

    function effortName(model, effortId) {
      if (effortId === DEFAULT_EFFORT || effortId === undefined || effortId === null) return '供应商默认';
      const efforts = (model && model.reasoning && model.reasoning.efforts) || [];
      const found = efforts.find((effort) => effort.id === effortId);
      return found ? (found.name || found.id) : String(effortId);
    }

    function effortOptions(reasoning) {
      if (!reasoning) return [];
      const options = [];
      const list = Array.isArray(reasoning.efforts) ? reasoning.efforts : [];
      const defaultId = reasoning.defaultEffort;
      if (defaultId === undefined) {
        options.push({ id: DEFAULT_EFFORT, name: '供应商默认' });
      } else if (!list.some((effort) => effort.id === defaultId)) {
        options.push({ id: defaultId, name: effortName({ reasoning }, defaultId) });
      }
      for (const effort of list) {
        options.push({ id: effort.id, name: effort.name || effort.id });
      }
      if (options.length === 0) options.push({ id: DEFAULT_EFFORT, name: '供应商默认' });
      return options;
    }

    function defaultEffortValue(record, current) {
      const runtime = pickRuntime(record, current);
      const reasoning = runtime && runtime.model && runtime.model.reasoning;
      if (record && record.isCurrent && current && current.reasoningEffort !== undefined) {
        return current.reasoningEffort;
      }
      if (reasoning && reasoning.defaultEffort !== undefined) return reasoning.defaultEffort;
      return DEFAULT_EFFORT;
    }

    function remoteErrorText(error) {
      if (!error) return '切换失败，请重试。';
      if (error.code === 'session/writer-held') return '当前会话正在运行，稍后再切换模型。';
      if (error.code === 'session/not-found') return '会话已经关闭，无法切换模型。';
      if (error.message) return String(error.message).slice(0, 320);
      if (error.code) return String(error.code).slice(0, 320);
      return '切换失败，请重试。';
    }

    function selectionFailure(result) {
      if (!result) return true;
      return result.ok === false;
    }

    function archiveFor(model) {
      if (!model) return null;
      const exact = ARCHIVE.find((record) =>
        (Array.isArray(record.apiIds) && record.apiIds.includes(model.id))
        || normalizeModelKey(record.name) === normalizeModelKey(model.name)
        || normalizeModelKey(record.name) === normalizeModelKey(model.id));
      if (exact) return exact;

      // Account catalogs append a short release stamp to the API id. Match the
      // base id only after explicit aliases and exact names have failed, and
      // prefer the longest matching record so V3-0324 never falls back to V3.
      const base = normalizeModelKey(String(model.id || '').replace(/[-_]?[0-9]{4,8}$/, ''));
      if (!base) return null;
      return ARCHIVE
        .filter((record) => normalizeModelKey(record.name) === base)
        .sort((left, right) => normalizeModelKey(right.name).length - normalizeModelKey(left.name).length)[0] || null;
    }

    function officialModelFor(record, models) {
      if (!record || !Array.isArray(models) || models.length === 0) return null;
      const preferred = OFFICIAL_RECORD_IDS[record.key];
      if (preferred) {
        const found = models.find((model) => model && model.id === preferred);
        if (found) return found;
      }
      const ids = new Set(Array.isArray(record.apiIds) ? record.apiIds : []);
      for (const model of models) {
        if (model && model.id && ids.has(model.id)) return model;
      }
      const recordKey = normalizeModelKey(record.name);
      if (!recordKey) return null;
      return models.find((model) => {
        if (!model || !model.version) return false;
        const versionKey = normalizeModelKey(model.version);
        return versionKey === recordKey || versionKey.startsWith(recordKey);
      }) || null;
    }

    function attachOfficial(record, model) {
      if (!record || !model) return record;
      record.official = model;
      record.officialVersion = model.version;
      record.officialMaxOutput = model.maxOutput;
      if (model.context) record.context = model.context;
      return record;
    }

    function officialRecord(model) {
      const hint = model && model.releaseHint;
      const month = hint && hint.month >= 1 && hint.month <= 12 ? hint.month : NOW.getMonth() + 1;
      const day = hint && hint.day >= 1 && hint.day <= 31 ? hint.day : 15;
      const versionMatch = /^DeepSeek[-_]?V?([\d.]+)[-_]?([A-Za-z]+)?/i.exec(String(model.version || model.id || ''));
      const symbol = versionMatch
        ? `V${versionMatch[1]}${versionMatch[2] ? versionMatch[2][0].toUpperCase() : ''}`
        : 'NEW';
      const name = String(model.version || model.id || '').replace(/-\d{4}$/, '');
      return {
        key: `official:${model.id}`,
        month: `${NOW.getFullYear()}-${pad2(month)}`,
        day,
        symbol: symbol.slice(0, 6),
        short: String(model.id || '').replace(/^deepseek-/, ''),
        name,
        lane: inferLane({ id: model.id, name: model.version }),
        params: '—',
        context: model.context || '—',
        maxOutput: model.maxOutput || '—',
        summary: '官方定价页中新增、尚未写入编辑档案的模型；发布日由版本后缀推断。',
        official: model,
        inferredDate: true,
        runtimes: [],
      };
    }

    function officialFeatures(model) {
      if (!model || !model.features) return [];
      const labels = [
        ['json', 'JSON'],
        ['tools', 'Tools'],
        ['responses', 'Responses'],
        ['anthropic', 'Anthropic'],
        ['prefix', 'Prefix'],
        ['vision', 'Vision'],
      ];
      return labels.filter(([key]) => model.features[key]).map(([, label]) => label);
    }

    function formatUsd(value) {
      const number = Number(value);
      if (!Number.isFinite(number)) return '—';
      const digits = Math.abs(number) >= 1 ? 2 : 3;
      return `$${number.toFixed(digits).replace(/0+$/, '').replace(/\.$/, '')}`;
    }

    function formatUsdPair(pair) {
      if (!pair) return '—';
      return `${formatUsd(pair.offPeak)} / ${formatUsd(pair.peak)}`;
    }

    function formatSyncTime(value) {
      if (!value) return '未同步';
      const date = new Date(value);
      if (!Number.isFinite(date.getTime())) return '未同步';
      return `${pad2(date.getMonth() + 1)}-${pad2(date.getDate())} ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
    }

    function effortMeter(name) {
      const key = String(name || '').toLowerCase();
      if (key.indexOf('off') >= 0 || key.indexOf('关') >= 0) return { latency: '0.55×', cost: '0.5×' };
      if (key.indexOf('low') >= 0 || key.indexOf('低') >= 0) return { latency: '0.8×', cost: '0.75×' };
      if (key.indexOf('max') >= 0 || key.indexOf('最高') >= 0) return { latency: '1.8×', cost: '2.1×' };
      return { latency: '1×', cost: '1×' };
    }

    function metricText(value) {
      if (value === null || value === undefined || value === '') return '—';
      return String(value);
    }

    function metricNumber(value) {
      if (typeof value === 'number') return value;
      const match = /([\d.]+)/.exec(String(value || ''));
      return match ? Number(match[1]) : null;
    }

    function sizeScore(value) {
      const match = /([\d.]+)\s*([KMBT])?/i.exec(String(value || ''));
      if (!match) return null;
      const number = Number(match[1]);
      if (!Number.isFinite(number)) return null;
      const unit = String(match[2] || '').toUpperCase();
      const scale = unit === 'T' ? 1e12 : unit === 'B' ? 1e9 : unit === 'M' ? 1e6 : unit === 'K' ? 1e3 : 1;
      return number * scale;
    }

    function officialPriceValue(record, slot) {
      const pricing = record && record.official && record.official.pricing;
      const pair = pricing && pricing[slot];
      return pair && Number.isFinite(Number(pair.offPeak)) ? Number(pair.offPeak) : null;
    }

    function relativePriceValue(record) {
      const match = /([\d.]+)/.exec(String((record && MODEL_PRICE[record.key]) || ''));
      return match ? Number(match[1]) : null;
    }

    function buildAtlas(groups, current, official) {
      const entries = [];
      for (const group of Array.isArray(groups) ? groups : []) {
        for (const model of Array.isArray(group && group.models) ? group.models : []) {
          if (isDeepSeekModel(group, model)) entries.push({ group, model });
        }
      }

      const buckets = new Map(ARCHIVE.map((record) => [record.key, []]));
      const synthetic = new Map();

      for (const entry of entries) {
        const model = entry.model;
        const found = archiveFor(model);

        if (found) {
          buckets.get(found.key).push(entry);
          continue;
        }

        const syntheticKey = `auto:${model.id}`;
        if (!synthetic.has(syntheticKey)) {
          const short = String(modelDisplayName(model)).replace(/^DeepSeek[-\s]*/i, '') || model.id;
          synthetic.set(syntheticKey, {
            key: syntheticKey,
            month: NOW_MONTH,
            day: 15,
            symbol: 'NEW',
            short,
            name: modelDisplayName(model),
            lane: inferLane(model),
            params: '目录模型',
            context: formatContext(model.contextWindow),
            summary: '当前工作区模型目录中新发现的 DeepSeek 模型。',
            runtimes: [],
          });
        }
        synthetic.get(syntheticKey).runtimes.push(entry);
      }

      const records = ARCHIVE.map((record) => ({ ...record, runtimes: buckets.get(record.key) || [] }));
      for (const record of synthetic.values()) records.push(record);

      const officialModels = official && Array.isArray(official.models) ? official.models : [];
      for (const record of records) {
        const matched = officialModelFor(record, officialModels);
        if (matched) attachOfficial(record, matched);
      }
      const matchedOfficialIds = new Set(records.filter((record) => record.official).map((record) => record.official.id));
      for (const model of officialModels) {
        if (!model || !model.id || matchedOfficialIds.has(model.id)) continue;
        records.push(officialRecord(model));
      }

      if (current) {
        for (const record of records) {
          record.isCurrent = record.runtimes.some((entry) =>
            entry.group && entry.group.id === current.provider
            && entry.model && entry.model.id === current.model);
        }
      }

      records.sort((left, right) => {
        if (left.month !== right.month) return left.month < right.month ? -1 : 1;
        const leftDay = left.day === undefined ? 15 : left.day;
        const rightDay = right.day === undefined ? 15 : right.day;
        if (leftDay !== rightDay) return leftDay - rightDay;
        return String(left.name).localeCompare(String(right.name));
      });
      records.forEach((record, index) => { record.no = index + 1; });
      return records;
    }

    const SEED_RECORDS = buildAtlas([], null, FALLBACK_OFFICIAL);
    const SEED_RECORD = SEED_RECORDS.find((record) =>
      Array.isArray(record.apiIds) && record.apiIds.includes('deepseek-flash'))
      || SEED_RECORDS.find((record) => yearOf(record.month) === NOW_YEAR && !record.forecast)
      || SEED_RECORDS[SEED_RECORDS.length - 1]
      || null;

    function statusOf(record) {
      if (!record) return { key: 'archive', label: '档案' };
      if (record.isCurrent) return { key: 'current', label: '使用中' };
      if (hasRuntime(record)) return { key: 'available', label: '可调用' };
      if (record.forecast) return { key: 'forecast', label: '路线图' };
      return { key: 'archive', label: '历史档案' };
    }

    function orderGroups(groups, current) {
      return [...(Array.isArray(groups) ? groups : [])].sort((left, right) => {
        const leftCurrent = current && current.provider === left.id ? -1 : 0;
        const rightCurrent = current && current.provider === right.id ? -1 : 0;
        if (leftCurrent !== rightCurrent) return leftCurrent - rightCurrent;
        const leftDeep = isDeepSeekGroup(left) ? 0 : 1;
        const rightDeep = isDeepSeekGroup(right) ? 0 : 1;
        return leftDeep - rightDeep;
      });
    }

    function findChoice(groups, current) {
      if (!current) return null;
      for (const group of groups) {
        for (const model of group.models || []) {
          if (group.id === current.provider && model.id === current.model) return { group, model };
        }
      }
      return null;
    }

    // A tiny external store shared by the composer seat and the shell overlay.
    const atlasStore = (() => {
      let snapshot = { payload: null };
      const listeners = new Set();
      const emit = () => {
        for (const listener of listeners) {
          try { listener(); } catch (error) { console.error(`[${NS}] overlay listener failed`, error); }
        }
      };
      return {
        subscribe(listener) {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
        getSnapshot() { return snapshot; },
        open(payload) {
          snapshot = { payload };
          emit();
        },
        close() {
          if (snapshot.payload === null) return;
          snapshot = { payload: null };
          emit();
        },
      };
    })();

    const EMPTY_DIRECTORY_STATE = Object.freeze({
      current: null,
      retainedEffort: undefined,
      routable: null,
      groups: Object.freeze([]),
      failures: Object.freeze([]),
      status: 'idle',
      pending: null,
      error: null,
    });

    function useDirectoryState(directory) {
      const subscribe = useCallback((listener) => {
        if (!directory || typeof directory.subscribe !== 'function') return () => {};
        return directory.subscribe(listener);
      }, [directory]);
      const getSnapshot = useCallback(() => {
        if (!directory || typeof directory.getSnapshot !== 'function') return EMPTY_DIRECTORY_STATE;
        return directory.getSnapshot() || EMPTY_DIRECTORY_STATE;
      }, [directory]);
      return useSyncExternalStore(subscribe, getSnapshot);
    }

    function loadDirectory(load) {
      if (typeof load !== 'function') return Promise.resolve(undefined);
      try {
        const result = load();
        return Promise.resolve(result).catch(() => undefined);
      } catch (error) {
        return Promise.resolve(undefined);
      }
    }

    function selectDirectory(select, selection) {
      if (typeof select !== 'function') {
        return Promise.resolve({ ok: false, error: { message: '模型目录不可用。' } });
      }
      try {
        return Promise.resolve(select(selection));
      } catch (error) {
        return Promise.resolve({ ok: false, error: { message: String(error && error.message ? error.message : error) } });
      }
    }

    function ensureStyles() {
      if (typeof document === 'undefined') return;
      const existing = document.getElementById(STYLE_ID);
      if (existing && existing.getAttribute('data-version') === '2') return;
      if (existing) existing.remove();
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.setAttribute('data-version', '2');
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    function WaveMark({ size = 16 }) {
      return h('svg', {
        width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
        'aria-hidden': 'true', focusable: 'false',
      },
        h('path', { d: 'M3 7c3.2 0 3.2 2.2 6.4 2.2S12.6 7 15.8 7s3.2 2.2 6.4 2.2', stroke: 'currentColor', strokeWidth: '1.6', strokeLinecap: 'round' }),
        h('path', { d: 'M3 12c3.2 0 3.2 2.2 6.4 2.2s3.2-2.2 6.4-2.2 3.2 2.2 6.4 2.2', stroke: 'currentColor', strokeWidth: '1.6', strokeLinecap: 'round', opacity: '.72' }),
        h('path', { d: 'M3 17c3.2 0 3.2 2.2 6.4 2.2s3.2-2.2 6.4-2.2 3.2 2.2 6.4 2.2', stroke: 'currentColor', strokeWidth: '1.6', strokeLinecap: 'round', opacity: '.42' }),
      );
    }

    function Chevron({ open }) {
      return h('svg', {
        width: 12, height: 12, viewBox: '0 0 12 12', fill: 'none', 'aria-hidden': 'true',
        className: `dsa-chevron${open ? ' is-open' : ''}`,
      }, h('path', { d: 'M2.5 4.5 6 8l3.5-3.5', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' }));
    }

    function CheckMark({ size = 12 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': 'true' },
        h('path', { d: 'm3.3 8.4 3 3 6.4-7', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' }));
    }

    function CloseMark({ size = 15 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': 'true' },
        h('path', { d: 'm3.5 3.5 9 9m0-9-9 9', stroke: 'currentColor', strokeWidth: '1.6', strokeLinecap: 'round' }));
    }

    function Spinner() {
      return h('span', { className: 'dsa-spinner', 'aria-hidden': 'true' });
    }

    function modelLabelNode(renderSlot, provider, model, placement, selected) {
      const fallback = h('span', { className: 'dsa-fallback-name' }, modelDisplayName(model));
      const inner = typeof renderSlot === 'function'
        ? renderSlot('conversation.input.model.label', { provider, model, placement, selected }, { fallback })
        : fallback;
      return h('span', {
        className: 'dsa-model-label',
        'data-provider-id': provider && provider.id,
        'data-model-id': model && model.id,
      }, inner);
    }

    function QuickModelRow({ group, model, selected, currentEffort, disabled, onChoose, renderSlot, resolveText }) {
      const provider = { id: group.id, name: providerName(group) };
      const badgeText = model.badge && typeof resolveText === 'function'
        ? resolveText(model.badge.text)
        : (model.badge && model.badge.text);
      const meta = [model.id];
      if (selected && currentEffort) meta.push(effortName(model, currentEffort));
      return h('button', {
        type: 'button',
        className: `dsa-pop-row${selected ? ' is-current' : ''}`,
        'data-dsa-model-row': 'true',
        'data-current': selected ? 'true' : undefined,
        'aria-pressed': selected,
        disabled: !!disabled,
        title: modelDisplayName(model),
        onClick: () => onChoose(group, model),
      },
        h('span', { className: 'dsa-pop-row-main' },
          h('span', { className: 'dsa-pop-row-title' },
            modelLabelNode(renderSlot, provider, model, 'menu', selected),
            badgeText ? h('span', {
              className: 'dsa-pop-badge',
              'data-tone': model.badge && model.badge.tone ? model.badge.tone : 'neutral',
            }, badgeText) : null,
          ),
          h('span', { className: 'dsa-pop-row-meta' }, meta.filter(Boolean).join(' · ')),
        ),
        h('span', { className: 'dsa-pop-row-tail' }, selected ? h(CheckMark) : null),
      );
    }

    function ModelSeat(props) {
      const {
        locked,
        available,
        directory,
        load,
        select,
        resolveText,
        renderSlot,
        sessionId,
      } = props;
      ensureStyles();

      const state = useDirectoryState(directory);
      const rootRef = useRef(null);
      const triggerRef = useRef(null);
      const popRef = useRef(null);
      const searchRef = useRef(null);
      const pressTimer = useRef(0);
      const pressStart = useRef(null);
      const longPressFired = useRef(false);
      const longPressReset = useRef(0);
      const busyRef = useRef(false);
      const [open, setOpen] = useState(false);
      const [busy, setBusy] = useState(false);
      const [error, setError] = useState(null);
      const [query, setQuery] = useState('');
      const [uid] = useState(() => `dsa-quick-${++uidCounter}`);

      const groups = orderGroups(state.groups, state.current);
      const currentChoice = findChoice(groups, state.current);
      const currentModel = currentChoice && currentChoice.model;
      const reasoning = currentModel && currentModel.reasoning;
      const effectiveEffort = state.current && state.current.reasoningEffort !== undefined
        ? state.current.reasoningEffort
        : (reasoning && reasoning.defaultEffort !== undefined ? reasoning.defaultEffort : DEFAULT_EFFORT);
      const currentEffortLabel = currentModel
        ? (reasoning ? effortName(currentModel, effectiveEffort) : state.retainedEffort)
        : undefined;
      const waiting = state.status === 'loading' && groups.length === 0;
      const modelLabel = currentModel ? modelDisplayName(currentModel) : (waiting ? '读取模型…' : '选择模型');
      const busyUi = busy || state.pending !== null;
      const showSearch = groups.reduce((total, group) => total + (group.models ? group.models.length : 0), 0) > 5;

      const filteredGroups = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return groups.map((group) => ({
          ...group,
          models: (group.models || []).filter((model) =>
            !needle || `${modelDisplayName(model)} ${model.id}`.toLowerCase().includes(needle)),
        })).filter((group) => group.models.length > 0);
      }, [groups, query]);

      const visibleCount = filteredGroups.reduce((total, group) => total + group.models.length, 0);
      const optionsNode = open && typeof renderSlot === 'function'
        ? renderSlot('conversation.input.model.options', {
          locked: !!locked || busyUi,
          dismiss: () => closeQuick(true),
          reportFailure: (message) => setError(String(message || '操作失败')),
        })
        : null;

      const clearPress = useCallback(() => {
        if (pressTimer.current) {
          window.clearTimeout(pressTimer.current);
          pressTimer.current = 0;
        }
        pressStart.current = null;
      }, []);

      const closeQuick = useCallback((restoreFocus) => {
        setOpen(false);
        if (restoreFocus) {
          window.requestAnimationFrame(() => {
            try { triggerRef.current && triggerRef.current.focus(); } catch (error) { /* noop */ }
          });
        }
      }, []);

      const hidePopover = useCallback(() => {
        const element = popRef.current;
        if (!element) return;
        try {
          if (element.matches(':popover-open')) element.hidePopover();
        } catch (error) { /* older Chromium */ }
      }, []);

      const openAtlas = useCallback(() => {
        clearPress();
        hidePopover();
        setOpen(false);
        longPressFired.current = true;
        if (longPressReset.current) window.clearTimeout(longPressReset.current);
        longPressReset.current = window.setTimeout(() => { longPressFired.current = false; }, 900);
        atlasStore.open({ directory, load, select, resolveText, sessionId });
      }, [clearPress, directory, hidePopover, load, resolveText, select, sessionId]);

      const showQuick = useCallback(() => {
        if (locked) return;
        setError(null);
        setQuery('');
        setOpen(true);
        if (state.status === 'idle' || state.status === 'error' || groups.length === 0) {
          loadDirectory(load);
        }
      }, [groups.length, load, locked, state.status]);

      useEffect(() => {
        if (!available) return;
        loadDirectory(load);
      }, [available]);

      useEffect(() => () => {
        clearPress();
        if (longPressReset.current) window.clearTimeout(longPressReset.current);
        hidePopover();
      }, [clearPress, hidePopover]);

      useLayoutEffect(() => {
        if (!open) return;
        const element = popRef.current;
        const trigger = triggerRef.current;
        if (!element || !trigger) return;
        element.style.visibility = 'hidden';
        const rect = trigger.getBoundingClientRect();
        const width = Math.max(300, Math.min(372, window.innerWidth - 24));
        const gap = 9;
        const spaceAbove = Math.max(0, rect.top - gap - 12);
        const spaceBelow = Math.max(0, window.innerHeight - rect.bottom - gap - 12);
        const opensUp = spaceAbove > spaceBelow && spaceAbove >= 260;
        element.style.width = `${width}px`;
        element.style.left = `${Math.max(12, Math.min(rect.right - width, window.innerWidth - width - 12))}px`;
        element.dataset.placement = opensUp ? 'top' : 'bottom';
        if (opensUp) {
          element.style.top = 'auto';
          element.style.bottom = `${Math.max(12, window.innerHeight - rect.top + gap)}px`;
          element.style.maxHeight = `${Math.min(540, Math.max(260, spaceAbove))}px`;
        } else {
          element.style.bottom = 'auto';
          element.style.top = `${Math.max(12, Math.min(window.innerHeight - 120, rect.bottom + gap))}px`;
          element.style.maxHeight = `${Math.min(540, Math.max(260, spaceBelow))}px`;
        }
      }, [open]);

      useEffect(() => {
        if (!open) return;
        const element = popRef.current;
        if (element) {
          if (!element.hasAttribute('popover')) element.setAttribute('popover', 'manual');
          try {
            if (!element.matches(':popover-open')) element.showPopover();
          } catch (error) { /* fall back to an inline card */ }
          element.style.visibility = 'visible';
        }

        const focusFrame = window.requestAnimationFrame(() => {
          try {
            if (showSearch && searchRef.current) searchRef.current.focus();
            else {
              const currentRow = element && element.querySelector('[data-current="true"]');
              const firstRow = element && element.querySelector('[data-dsa-model-row="true"]');
              (currentRow || firstRow || element) && (currentRow || firstRow || element).focus();
            }
          } catch (error) { /* noop */ }
        });

        const onPointerDown = (event) => {
          const target = event.target;
          if (rootRef.current && target instanceof Node && rootRef.current.contains(target)) return;
          if (popRef.current && target instanceof Node && popRef.current.contains(target)) return;
          closeQuick(false);
        };
        const onKeyDown = (event) => {
          if (event.key !== 'Escape') return;
          event.stopPropagation();
          closeQuick(true);
        };
        const onReposition = (event) => {
          if (event && event.target instanceof Node && popRef.current && popRef.current.contains(event.target)) return;
          closeQuick(false);
        };

        document.addEventListener('pointerdown', onPointerDown, true);
        document.addEventListener('keydown', onKeyDown, true);
        window.addEventListener('resize', onReposition);
        window.addEventListener('scroll', onReposition, true);
        return () => {
          window.cancelAnimationFrame(focusFrame);
          document.removeEventListener('pointerdown', onPointerDown, true);
          document.removeEventListener('keydown', onKeyDown, true);
          window.removeEventListener('resize', onReposition);
          window.removeEventListener('scroll', onReposition, true);
          hidePopover();
        };
      }, [open, showSearch, closeQuick, hidePopover]);

      if (!available) return null;

      const provider = currentChoice ? { id: currentChoice.group.id, name: providerName(currentChoice.group) } : null;
      const labelNode = currentChoice
        ? modelLabelNode(renderSlot, provider, currentModel, 'trigger', true)
        : h('span', { className: 'dsa-fallback-name' }, modelLabel);

      const startLongPress = (event) => {
        if (event.button !== 0 || locked) return;
        clearPress();
        pressStart.current = { x: event.clientX, y: event.clientY };
        pressTimer.current = window.setTimeout(() => {
          pressTimer.current = 0;
          longPressFired.current = true;
          if (longPressReset.current) window.clearTimeout(longPressReset.current);
          longPressReset.current = window.setTimeout(() => { longPressFired.current = false; }, 900);
          try { if (navigator.vibrate) navigator.vibrate(8); } catch (error) { /* noop */ }
          hidePopover();
          setOpen(false);
          atlasStore.open({ directory, load, select, resolveText, sessionId });
        }, 450);
      };

      const moveLongPress = (event) => {
        const start = pressStart.current;
        if (!start) return;
        if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 10) clearPress();
      };

      const chooseQuick = async (group, model) => {
        if (busyRef.current || locked) return;
        const selection = { provider: group.id, model: model.id };
        if (model.reasoning && model.reasoning.defaultEffort !== undefined) {
          selection.reasoningEffort = model.reasoning.defaultEffort;
        }
        busyRef.current = true;
        setBusy(true);
        setError(null);
        try {
          const result = await selectDirectory(select, selection);
          if (selectionFailure(result)) {
            setError(remoteErrorText(result && result.error));
            return;
          }
          closeQuick(true);
        } catch (caught) {
          setError(String(caught && caught.message ? caught.message : caught).slice(0, 320));
        } finally {
          busyRef.current = false;
          setBusy(false);
        }
      };

      const chooseEffort = async (effortId) => {
        if (!currentChoice || busyRef.current || locked) return;
        const selection = { provider: currentChoice.group.id, model: currentChoice.model.id };
        if (effortId !== DEFAULT_EFFORT && effortId !== undefined && effortId !== null) {
          selection.reasoningEffort = effortId;
        }
        busyRef.current = true;
        setBusy(true);
        setError(null);
        try {
          const result = await selectDirectory(select, selection);
          if (selectionFailure(result)) {
            setError(remoteErrorText(result && result.error));
            return;
          }
          closeQuick(true);
        } catch (caught) {
          setError(String(caught && caught.message ? caught.message : caught).slice(0, 320));
        } finally {
          busyRef.current = false;
          setBusy(false);
        }
      };

      const triggerAria = currentModel
        ? `${modelLabel}${currentEffortLabel ? `，${currentEffortLabel}` : ''}。点击切换模型，长按打开模型月历。`
        : '选择模型。长按打开模型月历。';

      return h('span', { className: 'dsa-seat', ref: rootRef },
        h('button', {
          type: 'button',
          ref: triggerRef,
          className: `dsa-trigger${open ? ' is-open' : ''}`,
          'aria-label': triggerAria,
          'aria-haspopup': 'dialog',
          'aria-expanded': open,
          'aria-controls': open ? uid : undefined,
          'aria-busy': busyUi,
          title: '点击切换模型 · 长按打开模型月历',
          disabled: !!locked,
          onClick: () => {
            if (longPressFired.current) return;
            if (open) closeQuick(true);
            else showQuick();
          },
          onPointerDown: startLongPress,
          onPointerMove: moveLongPress,
          onPointerUp: clearPress,
          onPointerCancel: clearPress,
          onPointerLeave: clearPress,
          onContextMenu: (event) => {
            event.preventDefault();
            if (open) closeQuick(false);
            openAtlas();
          },
          onKeyDown: (event) => {
            if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
              event.preventDefault();
              openAtlas();
            }
          },
        },
          h('span', { className: 'dsa-trigger-mark', 'aria-hidden': 'true' }, h(WaveMark, { size: 15 })),
          h('span', { className: 'dsa-trigger-label' }, labelNode),
          currentEffortLabel ? h('span', { className: 'dsa-trigger-effort' }, currentEffortLabel) : null,
          busyUi
            ? h(Spinner)
            : h(Chevron, { open }),
        ),

        open ? h('div', {
          ref: popRef,
          id: uid,
          popover: 'manual',
          role: 'dialog',
          'aria-label': '快速切换模型',
          className: 'dsa-pop',
          onKeyDown: (event) => {
            if (event.key === 'Escape') {
              event.stopPropagation();
              closeQuick(true);
            }
          },
        },
          h('div', { className: 'dsa-pop-head' },
            h('div', { className: 'dsa-pop-head-copy' },
              h('div', { className: 'dsa-pop-title' }, '切换模型'),
              h('div', { className: 'dsa-pop-sub' },
                groups.length ? `${groups.length} 个供应商 · 长按模型按钮打开周期表` : '正在读取模型目录…',
              ),
            ),
            h('button', {
              type: 'button',
              className: 'dsa-icon-button',
              'aria-label': '关闭快速切换',
              onClick: () => closeQuick(true),
            }, h(CloseMark, { size: 14 })),
          ),

          showSearch ? h('div', { className: 'dsa-pop-search-wrap' },
            h('input', {
              ref: searchRef,
              className: 'dsa-pop-search',
              type: 'search',
              value: query,
              placeholder: '搜索模型名称或 API ID',
              'aria-label': '搜索模型',
              onChange: (event) => setQuery(event.target.value),
            }),
          ) : null,

          error ? h('div', { className: 'dsa-pop-error', role: 'alert' }, error) : null,

          // Keep the current model's reasoning control above the scroll list.
          // The official menu exposed this through the codex-effort-slider
          // injection; with the model seat replaced, this is its new home.
          currentChoice && reasoning
            ? h('div', { className: 'dsa-pop-effort is-pinned' },
              h('div', { className: 'dsa-pop-effort-head' },
                h('span', { className: 'dsa-pop-effort-label' }, '推理强度'),
              ),
              h('div', { className: 'dsa-pop-effort-chips', role: 'group', 'aria-label': '推理强度' },
                effortOptions(reasoning).map((effort) => h('button', {
                  key: String(effort.id),
                  type: 'button',
                  className: `dsa-chip${effectiveEffort === effort.id ? ' is-selected' : ''}`,
                  'aria-pressed': effectiveEffort === effort.id,
                  disabled: busyUi,
                  onClick: () => chooseEffort(effort.id),
                }, effort.name)),
              ),
            ) : null,

          h('div', { className: 'dsa-pop-scroll' },
            state.failures && state.failures.length
              ? h('div', { className: 'dsa-pop-note' },
                `目录提示：${String(state.failures[0].message || state.failures[0].code || '部分供应商不可用').slice(0, 140)}`)
              : null,

            visibleCount === 0
              ? h('div', { className: 'dsa-pop-empty' },
                state.status === 'loading' ? '正在加载模型目录…' : '没有匹配的模型')
              : filteredGroups.map((group) => h('div', { className: 'dsa-pop-group', key: group.id },
                groups.length > 1 ? h('div', { className: 'dsa-pop-group-head' },
                  h('span', { className: 'dsa-pop-group-name' }, providerName(group)),
                  h('span', { className: 'dsa-pop-group-count' }, String(group.models.length)),
                ) : null,
                group.models.map((model) => h(QuickModelRow, {
                  key: `${group.id}:${model.id}`,
                  group,
                  model,
                  selected: !!(state.current && state.current.provider === group.id && state.current.model === model.id),
                  currentEffort: state.current && state.current.provider === group.id && state.current.model === model.id
                    ? state.current.reasoningEffort
                    : undefined,
                  disabled: busyUi,
                  onChoose: chooseQuick,
                  renderSlot,
                  resolveText,
                })),
              )),

            optionsNode ? h('div', { className: 'dsa-pop-slot' }, optionsNode) : null,
          ),

          h('div', { className: 'dsa-pop-foot' },
            h('button', {
              type: 'button',
              className: 'dsa-pop-atlas',
              onClick: () => { closeQuick(false); openAtlas(); },
            },
              h('span', { className: 'dsa-pop-atlas-mark' }, h(WaveMark, { size: 14 })),
              h('span', { className: 'dsa-pop-atlas-text' }, '模型月历'),
              h('span', { className: 'dsa-pop-atlas-hint' }, '打开'),
            ),
          ),
        ) : null,
      );
    }

    function ReleaseChip(props) {
      const {
        record,
        solo,
        focused,
        index,
        onFocusRecord,
        onHoverRecord,
        onHoverCancel,
        onDoubleActivate,
        onMoveFocus,
      } = props;
      const family = FAMILIES[record.lane] || FAMILIES.flagship;
      const status = statusOf(record);
      const forecastOnly = record.forecast && !hasRuntime(record);
      const soloSize = record.symbol.length >= 5 ? '15px'
        : record.symbol.length === 4 ? '17px' : '21px';
      return h('button', {
        type: 'button',
        className: `dsa-release is-${status.key}${solo ? ' is-solo' : ''}${focused ? ' is-focused' : ''}${forecastOnly ? ' is-forecast' : ''}`,
        style: {
          '--dsa-tone': family.color,
          '--dsa-tone-bg': family.bg,
          '--dsa-tone-border': family.border,
          animationDelay: `${Math.min(180, index * 26)}ms`,
        },
        'data-dsa-tile': record.key,
        'aria-label': `${record.name}，${formatDate(record)}，${status.label}`,
        'aria-current': record.isCurrent ? 'true' : undefined,
        title: `${record.name} · ${formatDate(record)} · ${status.label}`,
        onFocus: () => onFocusRecord(record),
        onClick: (event) => {
          event.stopPropagation();
          onFocusRecord(record);
        },
        onDoubleClick: (event) => {
          event.stopPropagation();
          onDoubleActivate(record);
        },
        onMouseEnter: () => onHoverRecord(record),
        onMouseLeave: () => onHoverCancel(),
        onKeyDown: (event) => {
          if (event.key === 'Home' || event.key === 'End') {
            const calendar = event.currentTarget.closest('.dsa-calendar');
            if (!calendar) return;
            const all = Array.from(calendar.querySelectorAll('[data-dsa-tile]'));
            const target = event.key === 'Home' ? all[0] : all[all.length - 1];
            if (target) {
              event.preventDefault();
              target.focus();
            }
            return;
          }
          if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
            event.preventDefault();
            onMoveFocus(event.currentTarget, event.key);
          }
        },
      },
        h('span', {
          className: 'dsa-release-symbol',
          style: solo ? { fontSize: soloSize } : undefined,
        }, record.symbol),
        h('span', { className: 'dsa-release-name' }, record.short),
        h('span', { className: `dsa-release-dot is-${status.key}`, 'aria-hidden': 'true' },
          record.isCurrent ? h(CheckMark, { size: 7 }) : null),
      );
    }

    function PeriodicTile(props) {
      const {
        record,
        focused,
        compare,
        onFocusRecord,
        onShiftSelect,
        onDoubleActivate,
        onMoveFocus,
      } = props;
      const family = FAMILIES[record.lane] || FAMILIES.flagship;
      const status = statusOf(record);
      const official = record.official;
      const version = official && official.version ? official.version : record.short;
      const priceTip = official && official.pricing
        ? `${formatUsdPair(official.pricing.cacheHit)} 缓存命中`
        : `${MODEL_PRICE[record.key] || '—'} 相对价`;
      const tip = `${metricText(record.context)} 上下文 · ${metricText(record.params)} 参数 · ${priceTip}`;
      const handleMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
        event.currentTarget.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
        event.currentTarget.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
        event.currentTarget.style.setProperty('--ry', `${((x - 0.5) * 6).toFixed(2)}deg`);
        event.currentTarget.style.setProperty('--rx', `${((0.5 - y) * 6).toFixed(2)}deg`);
      };
      const resetTilt = (event) => {
        event.currentTarget.style.setProperty('--ry', '0deg');
        event.currentTarget.style.setProperty('--rx', '0deg');
      };
      return h('button', {
        type: 'button',
        className: `dsa-ptile is-${status.key}${focused ? ' is-focused' : ''}${record.forecast ? ' is-forecast' : ''}${compare ? ' is-compared' : ''}`,
        style: {
          '--dsa-tone': family.color,
          '--dsa-tone-bg': family.bg,
          '--dsa-tone-border': family.border,
        },
        'data-dsa-tile': record.key,
        'data-tip': tip,
        'aria-pressed': compare ? 'true' : undefined,
        'aria-label': `${record.name}，${version}，${status.label}，${metricText(record.context)} 上下文`,
        onFocus: (event) => {
          if (event.currentTarget.matches(':focus-visible')) onFocusRecord(record);
        },
        onClick: (event) => {
          if (event.shiftKey) {
            event.preventDefault();
            onShiftSelect(record);
            return;
          }
          onFocusRecord(record);
        },
        onDoubleClick: (event) => {
          event.stopPropagation();
          onDoubleActivate(record);
        },
        onMouseMove: handleMove,
        onMouseLeave: resetTilt,
        onKeyDown: (event) => {
          if (event.key === 'Home' || event.key === 'End') {
            const grid = event.currentTarget.closest('.dsa-periodic-grid');
            if (!grid) return;
            const all = Array.from(grid.querySelectorAll('[data-dsa-tile]'));
            const target = event.key === 'Home' ? all[0] : all[all.length - 1];
            if (target) {
              event.preventDefault();
              target.focus();
            }
            return;
          }
          if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
            event.preventDefault();
            onMoveFocus(event.currentTarget, event.key);
          }
        },
      },
        h('span', { className: 'dsa-ptile-no' }, `No.${pad2(record.no || 0)}`),
        h('span', { className: 'dsa-ptile-symbol' }, record.symbol),
        h('span', { className: 'dsa-ptile-name' }, record.name),
        h('span', { className: 'dsa-ptile-version' }, version),
        h('span', { className: `dsa-ptile-dot is-${status.key}`, 'aria-hidden': 'true' }),
        compare ? h('span', { className: 'dsa-ptile-compare' }, '对比') : null,
      );
    }

    function AtlasSurface({ payload }) {
      const state = useDirectoryState(payload && payload.directory);
      const groups = Array.isArray(state.groups) ? state.groups : [];
      const [official, setOfficial] = useState(FALLBACK_OFFICIAL);
      const [syncState, setSyncState] = useState({
        mode: 'fallback',
        syncing: false,
        error: null,
        checkedAt: FALLBACK_OFFICIAL.checkedAt,
        source: 'builtin',
        stale: true,
      });
      const syncUnavailable = syncState.mode === 'unavailable';
      const syncOfficial = useCallback(async (force) => {
        setSyncState((previous) => ({ ...previous, syncing: true }));
        try {
          const response = await fetch(force ? OFFICIAL_REFRESH_ENDPOINT : OFFICIAL_ENDPOINT, {
            method: force ? 'POST' : 'GET', credentials: 'same-origin', cache: 'no-store',
          });
          if (response.status === 404) {
            setOfficial(FALLBACK_OFFICIAL);
            setSyncState({ mode: 'unavailable', syncing: false, error: null, checkedAt: null, source: 'builtin', stale: true });
            return false;
          }
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const snapshot = await response.json();
          if (!snapshot || !Array.isArray(snapshot.models) || snapshot.models.length === 0) {
            throw new Error('官方快照为空');
          }
          setOfficial(snapshot);
          setSyncState({
            mode: snapshot.stale ? 'stale' : 'live',
            syncing: false,
            error: snapshot.error || null,
            checkedAt: snapshot.checkedAt || snapshot.fetchedAt || null,
            source: snapshot.source || 'official',
            stale: !!snapshot.stale,
          });
          return true;
        } catch (error) {
          setSyncState((previous) => ({
            ...previous,
            mode: previous.source === 'builtin' ? 'fallback' : 'stale',
            syncing: false,
            error: String((error && error.message) || error),
            stale: true,
          }));
          return false;
        }
      }, []);

      useEffect(() => {
        if (syncUnavailable) return;
        let cancelled = false;
        let retryTimer = 0;
        let retryDelay = 15000;
        const pull = async (force) => {
          if (cancelled) return;
          const ok = await syncOfficial(force);
          if (ok) {
            retryDelay = 15000;
            return;
          }
          if (!cancelled) {
            window.clearTimeout(retryTimer);
            retryTimer = window.setTimeout(() => { void pull(false); }, retryDelay);
            retryDelay = Math.min(retryDelay * 2, 300000);
          }
        };
        void pull(false);
        const timer = window.setInterval(() => { void pull(false); }, OFFICIAL_POLL_MS);
        return () => {
          cancelled = true;
          window.clearTimeout(retryTimer);
          window.clearInterval(timer);
        };
      }, [syncOfficial, syncUnavailable]);

      const records = useMemo(() => buildAtlas(groups, state.current, official), [groups, state.current, official]);
      const currentRecord = records.find((record) => record.isCurrent) || null;
      const availableCount = records.filter(hasRuntime).length;

      const [year, setYear] = useState(SEED_RECORD ? yearOf(SEED_RECORD.month) : NOW_YEAR);
      const [monthIndex, setMonthIndex] = useState(
        SEED_RECORD ? Number(String(SEED_RECORD.month).slice(5, 7)) - 1 : NOW.getMonth(),
      );
      const [focusKey, setFocusKey] = useState(SEED_RECORD ? SEED_RECORD.key : null);
      const [mobileFilter, setMobileFilter] = useState('all');
      const [view, setView] = useState('periodic');
      const [compareMode, setCompareMode] = useState(false);
      const [compareKey, setCompareKey] = useState(null);
      const [toast, setToast] = useState(null);
      const [flash, setFlash] = useState(false);
      const [effort, setEffort] = useState(null);
      const [busy, setBusy] = useState(false);
      const [error, setError] = useState(null);
      const busyRef = useRef(false);
      const manualFocus = useRef(false);
      const initialFocusDone = useRef(false);
      const hoverTimer = useRef(0);
      const toastTimer = useRef(0);
      const closeTimer = useRef(0);
      const panelRef = useRef(null);
      const closeRef = useRef(null);
      const previousFocus = useRef(null);

      useEffect(() => {
        loadDirectory(payload && payload.load);
      }, [payload]);

      useEffect(() => {
        const onKeyDown = (event) => {
          if (event.key !== 'Escape') return;
          event.preventDefault();
          atlasStore.close();
        };
        const onBeforeUnload = () => atlasStore.close();
        document.addEventListener('keydown', onKeyDown, true);
        window.addEventListener('beforeunload', onBeforeUnload);
        return () => {
          document.removeEventListener('keydown', onKeyDown, true);
          window.removeEventListener('beforeunload', onBeforeUnload);
        };
      }, []);

      useEffect(() => {
        previousFocus.current = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const frame = window.requestAnimationFrame(() => {
          try { closeRef.current && closeRef.current.focus(); } catch (error) { /* noop */ }
        });
        return () => {
          window.cancelAnimationFrame(frame);
          document.body.style.overflow = previousOverflow;
          const target = previousFocus.current;
          if (target && typeof target.focus === 'function') {
            try { target.focus(); } catch (error) { /* noop */ }
          }
        };
      }, []);

      // The first live directory load decides which month opens. User-driven
      // navigation after that is never overridden by a later directory update.
      useEffect(() => {
        if (manualFocus.current || initialFocusDone.current) return;
        if (currentRecord) {
          initialFocusDone.current = true;
          setFocusKey(currentRecord.key);
          setYear(yearOf(currentRecord.month));
          setMonthIndex(Number(String(currentRecord.month).slice(5, 7)) - 1);
          return;
        }
        if (records.length) {
          initialFocusDone.current = true;
          const fallback = records.find((record) => yearOf(record.month) === year) || records[0];
          if (fallback) setFocusKey(fallback.key);
        }
      }, [records, currentRecord, year]);

      const monthsAvailable = useMemo(() => {
        const counts = Array(12).fill(0);
        for (const record of records) {
          if (yearOf(record.month) !== year) continue;
          const index = Number(String(record.month).slice(5, 7)) - 1;
          if (index >= 0 && index < 12) counts[index] += 1;
        }
        return counts;
      }, [records, year]);

      const selectedMonthKey = `${year}-${MONTHS[monthIndex]}`;
      const monthRecords = useMemo(
        () => records.filter((record) => record.month === selectedMonthKey),
        [records, selectedMonthKey],
      );
      const yearRecords = useMemo(
        () => records.filter((record) => yearOf(record.month) === year),
        [records, year],
      );
      const focused = records.find((record) => record.key === focusKey)
        || currentRecord
        || records[records.length - 1]
        || null;
      const periodicFamilies = useMemo(() => LANES.map((lane) => ({
        ...lane,
        records: records.filter((record) => record.lane === lane.id),
      })), [records]);
      const compareRecord = compareMode && compareKey
        ? records.find((record) => record.key === compareKey) || null
        : null;

      useEffect(() => {
        if (!focused) return;
        setEffort(defaultEffortValue(focused, state.current));
      }, [focused && focused.key, focused && focused.runtimes ? focused.runtimes.length : 0,
        state.current && state.current.provider, state.current && state.current.model,
        state.current && state.current.reasoningEffort]);

      const detailRuntime = pickRuntime(focused, state.current);
      const detailReasoning = detailRuntime && detailRuntime.model && detailRuntime.model.reasoning;
      const detailEfforts = detailReasoning ? effortOptions(detailReasoning) : [];
      const detailDefault = defaultEffortValue(focused, state.current);
      const selectedEffort = effort === null ? detailDefault : effort;
      const currentEffort = focused && focused.isCurrent
        ? (state.current && state.current.reasoningEffort !== undefined
          ? state.current.reasoningEffort
          : (detailReasoning && detailReasoning.defaultEffort !== undefined ? detailReasoning.defaultEffort : DEFAULT_EFFORT))
        : null;
      const sameEffort = focused && focused.isCurrent
        && (currentEffort === null ? selectedEffort === detailDefault : currentEffort === selectedEffort);
      const canSelect = !!detailRuntime;
      const ctaDisabled = !canSelect || busy || (focused && focused.isCurrent && sameEffort);
      const ctaLabel = !canSelect
        ? (focused && focused.forecast ? '尚未发布' : '历史版本 · 不可调用')
        : busy
          ? '切换中…'
          : focused && focused.isCurrent
            ? (sameEffort ? '当前使用中' : '应用推理强度')
            : '切换到此模型';

      // Hover intent: a 150ms delay stops the inspector from flickering when
      // the pointer crosses neighbouring days on its way to the effort chips.
      const cancelHover = useCallback(() => {
        if (hoverTimer.current) {
          window.clearTimeout(hoverTimer.current);
          hoverTimer.current = 0;
        }
      }, []);

      const hoverRecord = useCallback((record) => {
        if (!record) return;
        cancelHover();
        hoverTimer.current = window.setTimeout(() => {
          hoverTimer.current = 0;
          setFocusKey(record.key);
        }, 150);
      }, [cancelHover]);

      useEffect(() => () => cancelHover(), [cancelHover]);

      useEffect(() => () => {
        window.clearTimeout(toastTimer.current);
        window.clearTimeout(closeTimer.current);
      }, []);

      const selectPeriod = (nextYear, nextMonth, preferKey) => {
        manualFocus.current = true;
        cancelHover();
        setYear(nextYear);
        setMonthIndex(nextMonth);
        setMobileFilter('all');
        const key = `${nextYear}-${MONTHS[nextMonth]}`;
        const list = records.filter((record) => record.month === key);
        const target = list.find((record) => record.key === preferKey)
          || list.find((record) => record.isCurrent)
          || list.find(hasRuntime)
          || list[0]
          || null;
        if (target) setFocusKey(target.key);
      };

      const changeYear = (nextYear) => {
        const list = records.filter((record) => yearOf(record.month) === nextYear);
        const target = list.find((record) => record.isCurrent) || list[0] || null;
        if (target) {
          selectPeriod(nextYear, Number(String(target.month).slice(5, 7)) - 1, target.key);
        } else {
          manualFocus.current = true;
          cancelHover();
          setYear(nextYear);
        }
      };

      const focusRecord = (record) => {
        if (!record) return;
        manualFocus.current = true;
        cancelHover();
        const recordYear = yearOf(record.month);
        const recordMonth = Number(String(record.month).slice(5, 7)) - 1;
        if (recordYear !== year) setYear(recordYear);
        if (recordMonth !== monthIndex) setMonthIndex(recordMonth);
        if (compareKey === record.key) setCompareKey(null);
        setFocusKey(record.key);
      };

      const selectCompare = (record) => {
        if (!record) return;
        setCompareMode(true);
        if (!focused || record.key === focused.key || record.key === compareKey) {
          setCompareKey(null);
          return;
        }
        setCompareKey(record.key);
      };

      const jumpModel = (direction) => {
        if (!records.length) return;
        const currentIndex = focused ? records.findIndex((record) => record.key === focused.key) : -1;
        const nextIndex = currentIndex < 0
          ? 0
          : (currentIndex + direction + records.length) % records.length;
        const next = records[nextIndex];
        if (!next) return;
        focusRecord(next);
        window.requestAnimationFrame(() => {
          const target = Array.from(document.querySelectorAll('[data-dsa-tile]'))
            .find((node) => node.getAttribute('data-dsa-tile') === next.key);
          if (target) target.focus();
        });
      };

      const moveTileFocus = (element, key) => {
        const calendar = element && element.closest('.dsa-periodic-grid, .dsa-calendar');
        if (!calendar) return;
        const candidates = Array.from(calendar.querySelectorAll('[data-dsa-tile]'));
        const source = element.getBoundingClientRect();
        let best = null;
        let bestScore = Infinity;
        for (const candidate of candidates) {
          if (candidate === element) continue;
          const rect = candidate.getBoundingClientRect();
          const dx = (rect.left + rect.width / 2) - (source.left + source.width / 2);
          const dy = (rect.top + rect.height / 2) - (source.top + source.height / 2);
          const valid = key === 'ArrowRight' ? dx > 4
            : key === 'ArrowLeft' ? dx < -4
              : key === 'ArrowDown' ? dy > 4
                : dy < -4;
          if (!valid) continue;
          const primary = (key === 'ArrowLeft' || key === 'ArrowRight') ? Math.abs(dx) : Math.abs(dy);
          const cross = (key === 'ArrowLeft' || key === 'ArrowRight') ? Math.abs(dy) : Math.abs(dx);
          const score = primary + cross * 1.8;
          if (score < bestScore) { best = candidate; bestScore = score; }
        }
        if (best) best.focus();
      };

      const activate = async (record) => {
        if (!record || busyRef.current) return;
        const runtime = pickRuntime(record, state.current);
        if (!runtime) return;
        const selection = { provider: runtime.group.id, model: runtime.model.id };
        const chosen = record.key === (focused && focused.key)
          ? selectedEffort
          : defaultEffortValue(record, state.current);
        if (chosen !== DEFAULT_EFFORT && chosen !== undefined && chosen !== null) {
          selection.reasoningEffort = chosen;
        }
        busyRef.current = true;
        setBusy(true);
        setError(null);
        try {
          const result = await selectDirectory(payload && payload.select, selection);
          if (selectionFailure(result)) {
            setError(remoteErrorText(result && result.error));
            return;
          }
          const effortLabel = chosen === DEFAULT_EFFORT || chosen === undefined || chosen === null
            ? '默认强度'
            : effortName(runtime.model, chosen);
          setToast(`已切换至 ${record.name} · ${effortLabel}`);
          setFlash(true);
          window.clearTimeout(closeTimer.current);
          closeTimer.current = window.setTimeout(() => {
            setFlash(false);
            atlasStore.close();
          }, 1400);
        } catch (caught) {
          setError(String(caught && caught.message ? caught.message : caught).slice(0, 320));
        } finally {
          busyRef.current = false;
          if (atlasStore.getSnapshot().payload) setBusy(false);
        }
      };

      const onPanelKeyDown = (event) => {
        if (event.defaultPrevented) return;
        if (event.key === 'Escape') {
          event.preventDefault();
          atlasStore.close();
          return;
        }
        const target = event.target;
        const tag = target && target.tagName;
        const typing = tag === 'INPUT' || tag === 'TEXTAREA' || (target && target.isContentEditable);
        if (!typing && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
          event.preventDefault();
          jumpModel(event.key === 'ArrowLeft' ? -1 : 1);
          return;
        }
        if (!typing && event.key === 'Enter') {
          const onTile = target && typeof target.closest === 'function'
            && target.closest('[data-dsa-tile]');
          if ((onTile || target === panelRef.current) && focused && !ctaDisabled) {
            event.preventDefault();
            void activate(focused);
            return;
          }
        }
        if (event.key !== 'Tab' || !panelRef.current) return;
        const focusable = Array.from(panelRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )).filter((element) => element.offsetParent !== null);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      };

      const family = focused ? (FAMILIES[focused.lane] || FAMILIES.flagship) : FAMILIES.flagship;
      const status = statusOf(focused);
      const detailTags = focused
        ? (MODEL_TAGS[focused.key] || [family.label, focused.forecast ? '路线图预告' : '运行时模型'])
        : [];
      const detailPrice = focused ? (MODEL_PRICE[focused.key] || '—') : '—';
      const detailOfficial = focused && focused.official ? focused.official : null;
      const detailFeatures = detailOfficial ? officialFeatures(detailOfficial) : [];
      const syncTime = formatSyncTime(syncState.checkedAt || official.checkedAt);
      const syncModeLabel = syncState.syncing
        ? '同步中'
        : syncState.mode === 'live'
          ? '官方同步'
          : syncState.mode === 'stale'
            ? '官方缓存'
            : '内置快照';
      const syncTitle = syncUnavailable ? '当前宿主未提供受保护的同步接口，仍可浏览内置档案。升级或重启 DSH 后重试。' : syncState.error
        ? `最近检查 ${syncTime} · ${syncState.error}`
        : `官方定价页 · 最近检查 ${syncTime} · 每 6 小时检查一次`;
      const syncClass = syncState.syncing ? 'is-busy' : `is-${syncState.mode}`;
      const days = daysInMonth(year, monthIndex);
      const leading = firstWeekday(year, monthIndex);
      const totalCells = Math.ceil((leading + days) / 7) * 7;
      const previousMonthDays = daysInMonth(year, monthIndex - 1);
      const recordsByDay = new Map();
      for (const record of monthRecords) {
        const day = Math.min(days, Math.max(1, Number(record.day) || 1));
        if (!recordsByDay.has(day)) recordsByDay.set(day, []);
        recordsByDay.get(day).push(record);
      }
      const mobileRecords = yearRecords.filter(
        (record) => mobileFilter === 'all' || record.lane === mobileFilter,
      );
      const effortIndex = Math.max(0, detailEfforts.findIndex((item) => item.id === selectedEffort));
      const effortCount = Math.max(1, detailEfforts.length);
      const effortEstimate = effortMeter(selectedEffort);
      const compareWinner = (metric) => {
        if (metric.aScore === null || metric.aScore === undefined
          || metric.bScore === null || metric.bScore === undefined
          || metric.aScore === metric.bScore) return 'tie';
        const leftWins = metric.higher
          ? metric.aScore > metric.bScore
          : metric.aScore < metric.bScore;
        return leftWins ? 'a' : 'b';
      };
      const compareMetrics = (compareMode && compareRecord && focused) ? [
        {
          label: '上下文',
          a: metricText((focused.official && focused.official.context) || focused.context),
          b: metricText((compareRecord.official && compareRecord.official.context) || compareRecord.context),
          aScore: sizeScore((focused.official && focused.official.context) || focused.context),
          bScore: sizeScore((compareRecord.official && compareRecord.official.context) || compareRecord.context),
          higher: true,
        },
        {
          label: '参数规模*',
          a: metricText(focused.params),
          b: metricText(compareRecord.params),
          aScore: sizeScore(focused.params),
          bScore: sizeScore(compareRecord.params),
          higher: true,
        },
        {
          label: '最大输出',
          a: metricText((focused.official && focused.official.maxOutput) || focused.maxOutput),
          b: metricText((compareRecord.official && compareRecord.official.maxOutput) || compareRecord.maxOutput),
          aScore: sizeScore((focused.official && focused.official.maxOutput) || focused.maxOutput),
          bScore: sizeScore((compareRecord.official && compareRecord.official.maxOutput) || compareRecord.maxOutput),
          higher: true,
        },
        {
          label: '缓存命中 / 1M',
          a: formatUsdPair(focused.official && focused.official.pricing && focused.official.pricing.cacheHit),
          b: formatUsdPair(compareRecord.official && compareRecord.official.pricing && compareRecord.official.pricing.cacheHit),
          aScore: officialPriceValue(focused, 'cacheHit'),
          bScore: officialPriceValue(compareRecord, 'cacheHit'),
          higher: false,
        },
        {
          label: '输出 / 1M',
          a: formatUsdPair(focused.official && focused.official.pricing && focused.official.pricing.output),
          b: formatUsdPair(compareRecord.official && compareRecord.official.pricing && compareRecord.official.pricing.output),
          aScore: officialPriceValue(focused, 'output'),
          bScore: officialPriceValue(compareRecord, 'output'),
          higher: false,
        },
        {
          label: '相对价格*',
          a: MODEL_PRICE[focused.key] || '—',
          b: MODEL_PRICE[compareRecord.key] || '—',
          aScore: relativePriceValue(focused),
          bScore: relativePriceValue(compareRecord),
          higher: false,
        },
      ] : [];

      const dayCells = [];
      for (let index = 0; index < totalCells; index += 1) {
        const dayNumber = index - leading + 1;
        if (dayNumber < 1 || dayNumber > days) {
          const outsideDay = dayNumber < 1 ? previousMonthDays + dayNumber : dayNumber - days;
          dayCells.push(h('div', {
            key: `outside-${index}`,
            className: 'dsa-day is-outside',
            'aria-hidden': 'true',
          },
            h('div', { className: 'dsa-day-head' },
              h('span', { className: 'dsa-day-num' }, pad2(outsideDay)),
            ),
          ));
          continue;
        }
        const list = recordsByDay.get(dayNumber) || [];
        const primary = list[0] || null;
        const tone = primary ? (FAMILIES[primary.lane] || FAMILIES.flagship) : null;
        const isToday = selectedMonthKey === NOW_MONTH && dayNumber === NOW.getDate();
        const isWeekend = index % 7 >= 5;
        dayCells.push(h('div', {
          key: `day-${dayNumber}`,
          className: `dsa-day${isWeekend ? ' is-weekend' : ''}${list.length ? ' has-release' : ''}${isToday ? ' is-today' : ''}`,
          style: tone ? {
            '--dsa-day-tone': tone.color,
            '--dsa-day-border': tone.border,
            '--dsa-day-wash': tone.wash,
          } : undefined,
          onMouseEnter: list.length ? () => hoverRecord(primary) : undefined,
          onMouseLeave: list.length ? cancelHover : undefined,
        },
          h('div', { className: 'dsa-day-head' },
            h('span', { className: 'dsa-day-num' }, pad2(dayNumber)),
            isToday ? h('span', { className: 'dsa-day-today' }, '今天') : null,
          ),
          h('div', { className: `dsa-day-body${list.length >= 3 ? ' is-dense' : ''}` },
            list.length
              ? list.map((record, recordIndex) => h(ReleaseChip, {
                key: record.key,
                record,
                solo: list.length === 1,
                focused: record.key === focusKey,
                index: recordIndex,
                onFocusRecord: focusRecord,
                onHoverRecord: hoverRecord,
                onHoverCancel: cancelHover,
                onDoubleActivate: activate,
                onMoveFocus: moveTileFocus,
              }))
              : h('span', { className: 'dsa-day-empty', 'aria-hidden': 'true' }),
          ),
        ));
      }

      return h('div', { className: 'dsa-root' },
        h('div', { className: 'dsa-backdrop', onMouseDown: () => atlasStore.close() }),
        h('section', {
          className: 'dsa-panel',
          ref: panelRef,
          role: 'dialog',
          'aria-modal': 'true',
          'aria-labelledby': 'dsa-atlas-title',
          tabIndex: -1,
          onKeyDown: onPanelKeyDown,
        },
          h('div', { className: 'dsa-grid-texture', 'aria-hidden': 'true' }),
          h('div', { className: 'dsa-noise', 'aria-hidden': 'true' }),
          h('header', { className: 'dsa-head' },
            h('div', { className: 'dsa-brand' },
              h('div', { className: 'dsa-brand-mark', 'aria-hidden': 'true' }, h(WaveMark, { size: 21 })),
              h('div', { className: 'dsa-brand-copy' },
                h('div', { className: 'dsa-kicker' }, 'DeepSeek model almanac'),
                h('h1', { id: 'dsa-atlas-title', className: 'dsa-title' }, 'The DeepSeek Model Almanac'),
                h('p', { className: 'dsa-subtitle' }, '深度求索模型档案 · 周期表 / 月历双视图'),
              ),
            ),
            h('div', { className: 'dsa-head-actions' },
              h('div', { className: 'dsa-view-switch', role: 'group', 'aria-label': '视图切换' },
                h('button', {
                  type: 'button',
                  className: view === 'periodic' ? 'is-active' : '',
                  'aria-pressed': view === 'periodic',
                  onClick: () => setView('periodic'),
                }, '周期表'),
                h('button', {
                  type: 'button',
                  className: view === 'calendar' ? 'is-active' : '',
                  'aria-pressed': view === 'calendar',
                  onClick: () => setView('calendar'),
                }, '月历'),
              ),
              h('button', {
                type: 'button',
                className: `dsa-compare-toggle${compareMode ? ' is-on' : ''}`,
                'aria-pressed': compareMode,
                title: '开启后 Shift+点击两个模型进行对比',
                onClick: () => {
                  setCompareMode((value) => !value);
                  setCompareKey(null);
                },
              }, compareMode ? '对比中' : '对比'),
              h('button', {
                type: 'button',
                className: `dsa-sync ${syncClass}`,
                disabled: syncState.syncing || syncUnavailable,
                title: syncTitle,
                'aria-label': syncUnavailable ? `${syncModeLabel}，${syncTitle}` : `${syncModeLabel}，${syncTime}，点击立即检查官方定价页`,
                onClick: () => syncOfficial(true),
              },
                h('span', { className: 'dsa-sync-dot' }),
                h('span', { className: 'dsa-sync-text' }, syncModeLabel),
                h('span', { className: 'dsa-sync-time' }, syncTime),
              ),
              h('div', { className: `dsa-live${flash ? ' is-flash' : ''}` },
                h('span', { className: `dsa-live-dot${state.status === 'loading' ? ' is-loading' : ''}` }),
                h('span', { className: 'dsa-live-text' },
                  state.status === 'loading'
                    ? '同步目录中'
                    : availableCount > 0
                      ? `${availableCount} 个可用模型`
                      : '目录未返回模型'),
                h('span', { className: 'dsa-live-divider' }),
                h('span', { className: 'dsa-live-current' },
                  currentRecord ? `当前 · ${currentRecord.name}` : '当前模型不在档案中'),
              ),
              h('button', {
                type: 'button',
                ref: closeRef,
                className: 'dsa-close',
                'aria-label': '关闭模型月历',
                onClick: () => atlasStore.close(),
              }, h(CloseMark, { size: 15 })),
            ),
          ),

          toast ? h('div', { className: 'dsa-toast', role: 'status' }, toast) : null,

          h('div', { className: 'dsa-main' },
            view === 'periodic'
              ? h('div', { className: 'dsa-periodic-view', key: 'periodic' },
                h('div', { className: 'dsa-periodic-head' },
                  h('div', null,
                    h('div', { className: 'dsa-periodic-kicker' }, 'Complete archive · 2024—2027'),
                    h('div', { className: 'dsa-periodic-title' }, '按模型家族浏览'),
                  ),
                  h('div', { className: 'dsa-periodic-meta' },
                    `${records.length} 个模型 · 5 个家族`,
                    h('br'),
                    '双击应用 · Shift+点击对比',
                  ),
                ),
                h('div', { className: 'dsa-periodic-grid' },
                  periodicFamilies.map((lane) => h('section', {
                    key: lane.id,
                    className: 'dsa-family-col',
                    style: { '--dsa-tone': lane.color },
                  },
                    h('div', { className: 'dsa-family-head' },
                      h('strong', null, lane.label),
                      h('span', null, lane.en || ''),
                      h('span', null, pad2(lane.records.length)),
                    ),
                    h('div', { className: `dsa-family-list${lane.records.length === 1 ? ' is-single' : ''}` },
                      lane.records.map((record) => h(PeriodicTile, {
                        key: record.key,
                        record,
                        focused: !!focused && record.key === focused.key,
                        compare: compareMode && (
                          record.key === (focused && focused.key) || record.key === compareKey
                        ),
                        onFocusRecord: focusRecord,
                        onShiftSelect: selectCompare,
                        onDoubleActivate: activate,
                        onMoveFocus: moveTileFocus,
                      })),
                    ),
                  )),
                ),
              )
              : h(React.Fragment, null,
                h('div', { className: 'dsa-ledger' },
                  h('div', { className: 'dsa-years', role: 'tablist', 'aria-label': '发布年份' },
                    YEARS.map((item, index) => {
                      const count = records.filter((record) => yearOf(record.month) === item).length;
                      return h('button', {
                        key: item,
                        type: 'button',
                        role: 'tab',
                        'aria-selected': item === year,
                        className: `dsa-year${item === year ? ' is-active' : ''}`,
                        onClick: () => changeYear(item),
                        onKeyDown: (event) => {
                          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
                          event.preventDefault();
                          const direction = event.key === 'ArrowRight' ? 1 : -1;
                          const next = YEARS[(index + direction + YEARS.length) % YEARS.length];
                          changeYear(next);
                          const tabs = event.currentTarget.parentElement.querySelectorAll('[role="tab"]');
                          const target = tabs[(index + direction + YEARS.length) % YEARS.length];
                          if (target) window.requestAnimationFrame(() => target.focus());
                        },
                      },
                        h('span', { className: 'dsa-year-number' }, String(item)),
                        h('span', { className: 'dsa-year-count' }, pad2(count)),
                      );
                    }),
                  ),
                  h('div', { className: 'dsa-legend', 'aria-label': '图例' },
                    h('span', { className: 'dsa-legend-item' }, h('span', { className: 'dsa-legend-dot is-available' }), '可调用'),
                    h('span', { className: 'dsa-legend-item' }, h('span', { className: 'dsa-legend-dot is-current' }), '在用'),
                    h('span', { className: 'dsa-legend-item' }, h('span', { className: 'dsa-legend-dot is-archive' }), '档案'),
                    h('span', { className: 'dsa-legend-item' }, h('span', { className: 'dsa-legend-dot is-forecast' }), '预告'),
                  ),
                ),
                h('div', { className: 'dsa-months', role: 'group', 'aria-label': `${year} 年发布月份` },
                  MONTHS.map((month, index) => {
                    const count = monthsAvailable[index];
                    const active = index === monthIndex;
                    const isNow = `${year}-${month}` === NOW_MONTH;
                    return h('button', {
                      key: month,
                      type: 'button',
                      className: `dsa-month-pill${active ? ' is-active' : ''}${isNow ? ' is-now' : ''}${count ? ' has-models' : ''}`,
                      disabled: count === 0,
                      'aria-pressed': active,
                      'aria-label': `${year} 年 ${index + 1} 月，${count} 个模型${isNow ? '，本月' : ''}`,
                      title: count ? `${MONTH_CN[index]} · ${count} 个模型` : `${MONTH_CN[index]} · 暂无归档`,
                      onClick: () => selectPeriod(year, index),
                    },
                      h('span', { className: 'dsa-month-pill-num' }, month),
                      count ? h('span', { className: 'dsa-month-dot', 'aria-hidden': 'true' }) : null,
                      h('span', { className: 'dsa-month-pill-count' }, pad2(count)),
                    );
                  }),
                ),
                (state.failures && state.failures.length)
                  ? h('div', { className: 'dsa-banner', role: 'status' },
                    `目录提示：${String(state.failures[0].message || state.failures[0].code || '部分供应商暂时不可用').slice(0, 180)}`)
                  : null,
                h('div', { className: 'dsa-calendar-wrap' },
                  h('div', {
                    className: 'dsa-calendar',
                    key: selectedMonthKey,
                    role: 'tabpanel',
                    'aria-label': `${year} 年 ${monthIndex + 1} 月模型发布月历`,
                  },
                    h('div', { className: 'dsa-cal-caption' },
                      h('span', { className: 'dsa-cal-month' }, MONTHS[monthIndex]),
                      h('span', { className: 'dsa-cal-cn' }, MONTH_CN[monthIndex]),
                      h('span', { className: 'dsa-cal-year' }, String(year)),
                      h('span', { className: 'dsa-cal-count' },
                        `${days} 天 · `,
                        h('strong', null, String(monthRecords.length)),
                        ' 个模型',
                      ),
                    ),
                    h('div', { className: 'dsa-weekdays', 'aria-hidden': 'true' },
                      WEEKDAYS.map((weekday, index) => h('span', {
                        key: weekday,
                        className: `dsa-weekday${index >= 5 ? ' is-weekend' : ''}`,
                      }, weekday)),
                    ),
                    h('div', { className: 'dsa-days' }, dayCells),
                  ),
                ),
              ),
            h('div', { className: 'dsa-mobile' },
              h('div', { className: 'dsa-mobile-years', role: 'group', 'aria-label': '按年份筛选' },
                YEARS.map((item) => {
                  const count = records.filter((record) => yearOf(record.month) === item).length;
                  return h('button', {
                    key: item,
                    type: 'button',
                    className: `dsa-mobile-year${item === year ? ' is-active' : ''}`,
                    'aria-pressed': item === year,
                    onClick: () => changeYear(item),
                  }, String(item), h('span', null, String(count).padStart(2, '0')));
                }),
              ),
              h('div', { className: 'dsa-mobile-filters', role: 'group', 'aria-label': '按模型族筛选' },
                [{ id: 'all', label: '全部' }].concat(LANES).map((lane) => {
                  const count = lane.id === 'all'
                    ? yearRecords.length
                    : yearRecords.filter((record) => record.lane === lane.id).length;
                  return h('button', {
                    key: lane.id,
                    type: 'button',
                    className: `dsa-mobile-chip${mobileFilter === lane.id ? ' is-active' : ''}`,
                    'aria-pressed': mobileFilter === lane.id,
                    disabled: count === 0,
                    onClick: () => setMobileFilter(lane.id),
                  },
                    h('span', null, lane.label),
                    h('span', { className: 'dsa-mobile-chip-count' }, pad2(count)),
                  );
                }),
              ),
              h('div', { className: 'dsa-mobile-list' },
                mobileRecords.length
                  ? mobileRecords.map((record) => {
                    const itemFamily = FAMILIES[record.lane] || FAMILIES.flagship;
                    const itemStatus = statusOf(record);
                    return h('button', {
                      key: record.key,
                      type: 'button',
                      className: `dsa-mobile-card is-${itemStatus.key}${record.key === focusKey ? ' is-focused' : ''}`,
                      style: { '--dsa-tone': itemFamily.color },
                      'aria-current': record.isCurrent ? 'true' : undefined,
                      'aria-label': `${record.name}，${formatDate(record)}，${itemStatus.label}`,
                      onClick: () => focusRecord(record),
                      onDoubleClick: () => activate(record),
                    },
                      h('span', { className: 'dsa-mobile-tile' },
                        h('span', { className: 'dsa-mobile-no' }, pad2(record.no)),
                        h('span', { className: 'dsa-mobile-symbol' }, record.symbol),
                      ),
                      h('span', { className: 'dsa-mobile-copy' },
                        h('span', { className: 'dsa-mobile-name' }, record.name),
                        h('span', { className: 'dsa-mobile-meta' }, `${formatDate(record)} · ${itemFamily.label}`),
                        h('span', { className: 'dsa-mobile-tags' },
                          (MODEL_TAGS[record.key] || []).slice(0, 2).join(' · ') || record.short),
                      ),
                      h('span', { className: `dsa-mobile-status is-${itemStatus.key}` }, itemStatus.label),
                    );
                  })
                  : h('div', { className: 'dsa-mobile-empty' }, '该分类在本年没有模型。'),
              ),
              h('div', { className: 'dsa-mobile-hint' }, '单击查看详情，双击直接切换。'),
            ),
          ),

          compareMode && compareRecord && focused
            ? h('div', {
              className: 'dsa-detail dsa-compare',
              style: { '--dsa-detail-wash': family.wash, '--dsa-detail-tone': family.color },
              onMouseEnter: cancelHover,
            },
              h('div', { className: 'dsa-compare-card', style: { '--dsa-tone': family.color } },
                h('div', { className: 'dsa-compare-head' },
                  h('span', { className: 'dsa-compare-symbol' }, focused.symbol),
                  h('span', { className: 'dsa-compare-name' }, focused.name),
                  h('span', { className: `dsa-badge is-${status.key}` }, status.label),
                ),
                h('div', { className: 'dsa-compare-note' }, '当前聚焦'),
                compareMetrics.map((metric) => {
                  const win = compareWinner(metric);
                  return h('div', { className: 'dsa-compare-row', key: metric.label },
                    h('span', null, metric.label),
                    h('span', {
                      className: win === 'a' ? 'dsa-compare-win' : win === 'b' ? 'dsa-compare-lose' : '',
                    }, metric.a),
                  );
                }),
              ),
              h('div', { className: 'dsa-compare-card', style: { '--dsa-tone': (FAMILIES[compareRecord.lane] || FAMILIES.flagship).color } },
                h('div', { className: 'dsa-compare-head' },
                  h('span', { className: 'dsa-compare-symbol' }, compareRecord.symbol),
                  h('span', { className: 'dsa-compare-name' }, compareRecord.name),
                  h('span', { className: `dsa-badge is-${statusOf(compareRecord).key}` }, statusOf(compareRecord).label),
                ),
                h('div', { className: 'dsa-compare-note' }, '对比对象'),
                compareMetrics.map((metric) => {
                  const win = compareWinner(metric);
                  return h('div', { className: 'dsa-compare-row', key: metric.label },
                    h('span', null, metric.label),
                    h('span', {
                      className: win === 'b' ? 'dsa-compare-win' : win === 'a' ? 'dsa-compare-lose' : '',
                    }, metric.b),
                  );
                }),
              ),
            )
            : h('div', {
              className: 'dsa-detail dsa-bento',
              style: { '--dsa-detail-wash': family.wash, '--dsa-detail-tone': family.color },
              onMouseEnter: cancelHover,
            },
              h('div', { className: 'dsa-bento-id' },
                h('div', { className: `dsa-detail-tile is-${status.key}` },
                  h('span', { className: 'dsa-detail-no' }, focused ? pad2(focused.no) : '—'),
                  h('span', { className: 'dsa-detail-symbol' }, focused ? focused.symbol : '—'),
                ),
                h('div', { className: 'dsa-detail-copy' },
                  h('div', { className: 'dsa-detail-meta' },
                    focused ? formatDate(focused) : '—',
                    ' · ',
                    family.label,
                    ' · ',
                    focused ? `No. ${pad2(focused.no)}` : '—',
                  ),
                  h('div', { className: 'dsa-detail-title-row' },
                    h('h2', { className: 'dsa-detail-title' }, focused ? focused.name : '未选择模型'),
                    h('span', { className: `dsa-badge is-${status.key}` }, status.label),
                    focused && focused.isCurrent ? h('span', { className: 'dsa-badge is-soft' }, 'LIVE') : null,
                  ),
                  h('p', { className: 'dsa-detail-summary' }, focused ? focused.summary : ''),
                  detailTags.length
                    ? h('div', { className: 'dsa-tags' },
                      detailTags.slice(0, 3).map((tag) => h('span', { className: 'dsa-tag', key: tag }, tag)))
                    : null,
                  detailOfficial
                    ? h('div', { className: 'dsa-official dsa-official-compact' },
                      h('span', { className: 'dsa-official-label' }, '官方'),
                      h('span', { className: 'dsa-official-version' }, `${detailOfficial.id} · ${detailOfficial.version}`),
                      h('a', {
                        className: 'dsa-official-link',
                        href: OFFICIAL_PAGE_URL,
                        target: '_blank',
                        rel: 'noreferrer',
                      }, '定价页 ↗'),
                    )
                    : h('div', { className: 'dsa-official dsa-official-compact' },
                      h('span', { className: 'dsa-official-label' }, '官方'),
                      h('span', { className: 'dsa-official-note' }, '快照未匹配 · 使用编辑档案'),
                    ),
                ),
              ),
              h('div', { className: 'dsa-bento-metrics' },
                h('div', { className: 'dsa-metric' },
                  h('span', { className: 'dsa-metric-label' }, '上下文'),
                  h('span', { className: 'dsa-metric-value' }, metricText((detailOfficial && detailOfficial.context) || (focused && focused.context))),
                  h('span', { className: 'dsa-metric-note' }, detailOfficial ? '官方同步' : '编辑档案'),
                ),
                h('div', { className: 'dsa-metric' },
                  h('span', { className: 'dsa-metric-label' }, '参数规模*'),
                  h('span', { className: 'dsa-metric-value' }, metricText(focused && focused.params)),
                  h('span', { className: 'dsa-metric-note' }, '官方未公布 · 编辑标注'),
                ),
                h('div', { className: 'dsa-metric' },
                  h('span', { className: 'dsa-metric-label' }, '最大输出'),
                  h('span', { className: 'dsa-metric-value' }, metricText((detailOfficial && detailOfficial.maxOutput) || (focused && focused.maxOutput))),
                  h('span', { className: 'dsa-metric-note' }, detailOfficial ? '官方同步' : '编辑档案'),
                ),
                h('div', { className: 'dsa-metric' },
                  h('span', { className: 'dsa-metric-label' }, '缓存命中 / 1M'),
                  h('span', { className: 'dsa-metric-value is-price' }, formatUsdPair(detailOfficial && detailOfficial.pricing && detailOfficial.pricing.cacheHit)),
                  h('span', { className: 'dsa-metric-note' }, '低峰 / 高峰'),
                ),
                h('div', { className: 'dsa-metric' },
                  h('span', { className: 'dsa-metric-label' }, '输出 / 1M'),
                  h('span', { className: 'dsa-metric-value is-price' }, formatUsdPair(detailOfficial && detailOfficial.pricing && detailOfficial.pricing.output)),
                  h('span', { className: 'dsa-metric-note' }, '低峰 / 高峰'),
                ),
                h('div', { className: 'dsa-metric' },
                  h('span', { className: 'dsa-metric-label' }, '相对价格*'),
                  h('span', { className: 'dsa-metric-value' }, detailPrice),
                  h('span', { className: 'dsa-metric-note' }, 'V2 = 1.0× · 演示倍率'),
                ),
              ),
              h('div', { className: 'dsa-bento-controls' },
                h('div', { className: 'dsa-bento-controls-label' },
                  h('span', null, '推理强度'),
                  h('span', null, detailReasoning ? 'Effort' : '不可用'),
                ),
                detailEfforts.length
                  ? h('div', {
                    className: 'dsa-segmented',
                    style: {
                      '--dsa-seg-count': detailEfforts.length,
                      '--dsa-seg-index': effortIndex,
                    },
                    role: 'group',
                    'aria-label': '推理强度',
                  },
                    h('span', { className: 'dsa-seg-thumb', 'aria-hidden': 'true' }),
                    detailEfforts.map((item) => h('button', {
                      key: String(item.id),
                      type: 'button',
                      className: `dsa-seg-btn${selectedEffort === item.id ? ' is-on' : ''}`,
                      'aria-pressed': selectedEffort === item.id,
                      disabled: busy,
                      onClick: () => setEffort(item.id),
                    }, item.name)),
                  )
                  : h('div', { className: 'dsa-estimate' }, '该模型没有可调推理强度'),
                h('div', { className: 'dsa-estimate' },
                  h('span', null, '预计延迟 ', h('strong', null, effortEstimate.latency)),
                  h('span', null, '消耗 ', h('strong', null, effortEstimate.cost)),
                ),
                h('button', {
                  type: 'button',
                  className: 'dsa-cta',
                  disabled: ctaDisabled,
                  onClick: () => activate(focused),
                }, busy ? h(Spinner) : null, h('span', null, ctaLabel)),
                error ? h('div', { className: 'dsa-detail-error', role: 'alert' }, error) : null,
                h('div', { className: 'dsa-hint' },
                  !canSelect
                    ? (focused && focused.forecast
                      ? '路线图预告，发布日期与规格为推测。'
                      : '历史档案仅用于回顾，不可在当前会话调用。')
                    : (focused && focused.isCurrent
                      ? '双击图块也可应用当前强度。'
                      : '双击图块也可直接切换。'),
                ),
              ),
            ),

          h('div', { className: 'dsa-shortcuts', 'aria-hidden': 'true' },
            h('span', { className: 'dsa-kbd' }, '←'),
            h('span', { className: 'dsa-kbd' }, '→'),
            h('span', null, '切换模型'),
            h('span', { className: 'dsa-kbd' }, 'Enter'),
            h('span', null, '应用'),
            h('span', { className: 'dsa-kbd' }, 'Esc'),
            h('span', null, '关闭'),
            h('span', null, '· Shift+点击 对比'),
          ),
        ),
      );
    }

    // The plugin intentionally leaves the shipped model button and its menu
    // alone. A hidden bridge inside the composer supplies the live directory
    // for the current session; long-press/right-click on the official trigger
    // is the only entry point into the atlas.
    const atlasBridge = { payload: null };

    function officialModelTrigger(target) {
      if (!(target instanceof Element)) return null;
      const button = target.closest('button[aria-haspopup="menu"]');
      if (!button || !button.querySelector('[data-model-id]')) return null;
      // Only the composer's own model seat may open the almanac. The hidden
      // bridge below is rendered from conversation.input.right, so a matching
      // button in settings, a subagent panel or another plugin never passes.
      const card = button.closest('[data-composer-card]');
      if (!card || !card.querySelector('[data-dsa-bridge]')) return null;
      const label = String(button.getAttribute('aria-label') || '').toLowerCase();
      if (!label.includes('模型') && !label.includes('model')) return null;
      return button;
    }

    const PRESS_RING_CLASS = 'dsa-press-ring';
    let pressRing = null;

    function hidePressRing() {
      if (!pressRing) return;
      const node = pressRing;
      pressRing = null;
      node.classList.remove('is-running');
      window.setTimeout(() => {
        if (node.parentNode) node.parentNode.removeChild(node);
      }, 140);
    }

    function showPressRing(trigger) {
      hidePressRing();
      if (typeof document === 'undefined' || !document.body) return;
      const rect = trigger.getBoundingClientRect();
      const width = Math.max(52, Math.round(rect.width + 18));
      const height = Math.max(40, Math.round(rect.height + 16));
      const node = document.createElement('div');
      node.className = PRESS_RING_CLASS;
      node.setAttribute('aria-hidden', 'true');
      node.style.left = `${Math.round(rect.left + rect.width / 2)}px`;
      node.style.top = `${Math.round(rect.top + rect.height / 2)}px`;
      node.style.width = `${width}px`;
      node.style.height = `${height}px`;
      // The progress outline follows the capsule's pill shape instead of
      // drawing a huge circle around a wide button. It starts at 12 o'clock
      // and travels clockwise, matching the 500ms long-press.
      const inset = 3;
      const radius = Math.max(8, (height - inset * 2) / 2);
      const x0 = inset;
      const y0 = inset;
      const x1 = width - inset;
      const y1 = height - inset;
      const path = [
        `M ${width / 2} ${y0}`,
        `L ${x1 - radius} ${y0}`,
        `A ${radius} ${radius} 0 0 1 ${x1} ${y0 + radius}`,
        `L ${x1} ${y1 - radius}`,
        `A ${radius} ${radius} 0 0 1 ${x1 - radius} ${y1}`,
        `L ${x0 + radius} ${y1}`,
        `A ${radius} ${radius} 0 0 1 ${x0} ${y1 - radius}`,
        `L ${x0} ${y0 + radius}`,
        `A ${radius} ${radius} 0 0 1 ${x0 + radius} ${y0}`,
        `L ${width / 2} ${y0}`,
        'Z',
      ].join(' ');
      node.innerHTML = `<svg viewBox="0 0 ${width} ${height}"><path class="dsa-press-ring-track" d="${path}"></path><path class="dsa-press-ring-fill" d="${path}"></path></svg>`;
      document.body.appendChild(node);
      pressRing = node;
      const fill = node.querySelector('.dsa-press-ring-fill');
      let length = 0;
      try {
        length = fill && typeof fill.getTotalLength === 'function' ? fill.getTotalLength() : 0;
      } catch (error) {
        length = 0;
      }
      if (fill && length > 0) {
        fill.style.strokeDasharray = `${length}`;
        fill.style.strokeDashoffset = `${length}`;
      }
      // Reading layout once makes the stroke transition start from zero
      // instead of being collapsed into the same frame as the append.
      void node.getBoundingClientRect();
      node.classList.add('is-running');
      if (fill && length > 0) {
        window.requestAnimationFrame(() => {
          if (pressRing === node) fill.style.strokeDashoffset = '0';
        });
      }
    }

    function attachAtlasLongPress(readPayload) {
      let timer = 0;
      let press = null;
      let suppressClick = false;

      const clearPress = () => {
        if (timer) {
          window.clearTimeout(timer);
          timer = 0;
        }
        press = null;
        hidePressRing();
      };

      const openAtlas = () => {
        const payload = readPayload();
        if (!payload || !payload.available || !payload.directory) return false;
        try {
          atlasStore.open(payload);
          return true;
        } catch (error) {
          console.error(`[${NS}] failed to open atlas`, error);
          return false;
        }
      };

      const onPointerDown = (event) => {
        suppressClick = false;
        if (!event.isPrimary || event.button !== 0) return;
        const trigger = officialModelTrigger(event.target);
        if (!trigger) return;
        clearPress();
        press = { trigger, x: event.clientX, y: event.clientY };
        showPressRing(trigger);
        timer = window.setTimeout(() => {
          timer = 0;
          if (!press) return;
          hidePressRing();
          const opened = openAtlas();
          if (opened) {
            suppressClick = true;
            press = null;
          }
        }, 500);
      };

      const onPointerMove = (event) => {
        if (!press) return;
        if (Math.hypot(event.clientX - press.x, event.clientY - press.y) > 10) clearPress();
      };

      const onPointerUp = () => clearPress();
      const onPointerCancel = () => clearPress();

      const onContextMenu = (event) => {
        if (!officialModelTrigger(event.target)) return;
        event.preventDefault();
        event.stopPropagation();
        clearPress();
        if (openAtlas()) suppressClick = true;
      };

      const onClick = (event) => {
        if (!suppressClick || !officialModelTrigger(event.target)) return;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        suppressClick = false;
      };

      document.addEventListener('pointerdown', onPointerDown, true);
      document.addEventListener('pointermove', onPointerMove, true);
      document.addEventListener('pointerup', onPointerUp, true);
      document.addEventListener('pointercancel', onPointerCancel, true);
      document.addEventListener('contextmenu', onContextMenu, true);
      document.addEventListener('click', onClick, true);

      return () => {
        clearPress();
        document.removeEventListener('pointerdown', onPointerDown, true);
        document.removeEventListener('pointermove', onPointerMove, true);
        document.removeEventListener('pointerup', onPointerUp, true);
        document.removeEventListener('pointercancel', onPointerCancel, true);
        document.removeEventListener('contextmenu', onContextMenu, true);
        document.removeEventListener('click', onClick, true);
      };
    }

    function AtlasBridge(props) {
      const { available, directory, load, select, resolveText, sessionId } = props;
      const payload = useMemo(() => ({
        available,
        directory,
        load,
        select,
        resolveText,
        sessionId,
      }), [available, directory, load, select, resolveText, sessionId]);

      useEffect(() => {
        if (!available) return undefined;
        atlasBridge.payload = payload;
        try {
          const pending = load && load();
          if (pending && typeof pending.catch === 'function') pending.catch(() => undefined);
        } catch (error) {
          /* A directory load failure must not break the composer. */
        }
        const detach = attachAtlasLongPress(() => atlasBridge.payload);
        return () => {
          detach();
          if (atlasBridge.payload === payload) atlasBridge.payload = null;
        };
      }, [available, load, payload]);

      return h('span', {
        'data-dsa-bridge': '',
        'aria-hidden': 'true',
        hidden: true,
        style: { display: 'none' },
      });
    }

    function AtlasOverlay() {
      ensureStyles();
      const snapshot = useSyncExternalStore(atlasStore.subscribe, atlasStore.getSnapshot);
      if (!snapshot || !snapshot.payload) return null;
      const surface = h(AtlasSurface, {
        key: snapshot.payload.sessionId || 'atlas',
        payload: snapshot.payload,
      });
      // shell.overlay sits inside a z-index:20 stacking context. Body-level
      // widgets (the desktop companion at z-index 9999) would cover the
      // atlas there, so escape to the body and keep the real top layer.
      if (ReactDOM && typeof ReactDOM.createPortal === 'function' && typeof document !== 'undefined') {
        return ReactDOM.createPortal(surface, document.body);
      }
      return surface;
    }

    let uidCounter = 0;

    // The quick popover and the overlay both rely on the stylesheet. Registering
    // it in apply keeps the first paint free of an unstyled flash.
    ensureStyles();

    function apply(ctx) {
      try {
        ctx.inject(['slots', 'modelDirectories', 'sessions'], (scope) => {
          const models = scope.modelDirectories;
          const sessions = scope.sessions;
          if (!models || !sessions) return;

          scope.slots.inject('shell.overlay', () => scope.slots.register({
            name: 'shell.overlay',
            id: `${NS}:overlay`,
            order: 1000,
            registrant: NS,
            inject: () => ({}),
          }, AtlasOverlay));

          // Do not replace conversation.input.model. The shipped button, its
          // menu, and the codex-effort-slider that decorates that menu stay
          // exactly as they are. This invisible per-session bridge only gives
          // the long-press listener a live directory and select() function.
          scope.slots.inject('conversation.input.right', () => scope.slots.register({
            name: 'conversation.input.right',
            id: `${NS}:bridge`,
            order: 41,
            registrant: NS,
            label: () => 'DeepSeek 模型月历',
            inject: (sessionId) => {
              const directory = models.directoryFor(sessionId);
              const available = sessions.subagentAddress(sessionId) === undefined;
              return {
                available,
                directory: directory.store,
                load: () => {
                  if (!available) return Promise.resolve(undefined);
                  try {
                    return Promise.resolve(directory.load()).catch(() => undefined);
                  } catch (error) {
                    return Promise.resolve(undefined);
                  }
                },
                select: (selection) => {
                  if (!available) return Promise.resolve(undefined);
                  try {
                    return directory.select(selection);
                  } catch (error) {
                    return Promise.resolve({
                      ok: false,
                      error: { message: String(error && error.message ? error.message : error) },
                    });
                  }
                },
                resolveText: (text) => {
                  try {
                    return ctx.locale.resolveText(text);
                  } catch (error) {
                    return text;
                  }
                },
              };
            },
          }, AtlasBridge));
        });
      } catch (error) {
        console.error(`[${NS}] failed to register model atlas`, error);
      }
    }

    return {
      name: NS,
      inject: ['slots', 'modelDirectories', 'sessions'],
      apply,
    };
  },
});
