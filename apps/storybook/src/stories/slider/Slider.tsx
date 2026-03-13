import React from 'react';
import { SliderItem } from '../slider-item/SliderItem';
import './slider.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface SliderProps {
  /** Current value (single mode) */
  value?: number;
  /** Range values [min, max] (range mode) */
  range?: [number, number];
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Called when value changes (single mode) */
  onChange?: (value: number) => void;
  /** Called when range changes (range mode) */
  onRangeChange?: (range: [number, number]) => void;
  /** Accessible label */
  'aria-label'?: string;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Helpers
   --------------------------------------------------------------------------- */

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

const snapToStep = (val: number, min: number, step: number) =>
  Math.round((val - min) / step) * step + min;

const toPercent = (val: number, min: number, max: number) =>
  ((val - min) / (max - min)) * 100;

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      range,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      onChange,
      onRangeChange,
      'aria-label': ariaLabel,
      className,
    },
    ref,
  ) => {
    const trackRef = React.useRef<HTMLDivElement>(null);
    const draggingRef = React.useRef<'single' | 'start' | 'end' | null>(null);

    const isRange = range !== undefined;
    const singleVal = clamp(value ?? min, min, max);
    const rangeStart = isRange ? clamp(range[0], min, max) : min;
    const rangeEnd = isRange ? clamp(range[1], min, max) : singleVal;

    const getValueFromPosition = React.useCallback(
      (clientX: number) => {
        const el = trackRef.current;
        if (!el) return min;
        const rect = el.getBoundingClientRect();
        const pct = clamp((clientX - rect.left) / rect.width, 0, 1);
        const raw = min + pct * (max - min);
        return clamp(snapToStep(raw, min, step), min, max);
      },
      [min, max, step],
    );

    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        e.preventDefault();
        const el = e.currentTarget as HTMLElement;
        el.setPointerCapture(e.pointerId);

        const val = getValueFromPosition(e.clientX);

        if (isRange) {
          const distStart = Math.abs(val - rangeStart);
          const distEnd = Math.abs(val - rangeEnd);
          const thumb = distStart <= distEnd ? 'start' : 'end';
          draggingRef.current = thumb;
          if (thumb === 'start') {
            onRangeChange?.([val, rangeEnd]);
          } else {
            onRangeChange?.([rangeStart, val]);
          }
        } else {
          draggingRef.current = 'single';
          onChange?.(val);
        }
      },
      [disabled, isRange, rangeStart, rangeEnd, getValueFromPosition, onChange, onRangeChange],
    );

    const handlePointerMove = React.useCallback(
      (e: React.PointerEvent) => {
        if (!draggingRef.current) return;
        const val = getValueFromPosition(e.clientX);

        if (draggingRef.current === 'single') {
          onChange?.(val);
        } else if (draggingRef.current === 'start') {
          onRangeChange?.([Math.min(val, rangeEnd), rangeEnd]);
        } else if (draggingRef.current === 'end') {
          onRangeChange?.([rangeStart, Math.max(val, rangeStart)]);
        }
      },
      [rangeStart, rangeEnd, getValueFromPosition, onChange, onRangeChange],
    );

    const handlePointerUp = React.useCallback(() => {
      draggingRef.current = null;
    }, []);

    /* Track positioning */
    const trackLeft = isRange
      ? `${toPercent(rangeStart, min, max)}%`
      : '0%';
    const trackWidth = isRange
      ? `${toPercent(rangeEnd, min, max) - toPercent(rangeStart, min, max)}%`
      : `${toPercent(singleVal, min, max)}%`;

    return (
      <div
        ref={ref}
        className={['dls-slider', className].filter(Boolean).join(' ')}
        data-disabled={disabled ? '' : undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div ref={trackRef} className="dls-slider__bar" />
        <div
          className="dls-slider__track"
          style={{ left: trackLeft, width: trackWidth }}
        />

        {isRange ? (
          <>
            <div
              className="dls-slider__thumb"
              style={{ left: `${toPercent(rangeStart, min, max)}%` }}
            >
              <SliderItem
                value={rangeStart}
                min={min}
                max={max}
                disabled={disabled}
                aria-label={ariaLabel ? `${ariaLabel} minimum` : 'Minimum'}
              />
            </div>
            <div
              className="dls-slider__thumb"
              style={{ left: `${toPercent(rangeEnd, min, max)}%` }}
            >
              <SliderItem
                value={rangeEnd}
                min={min}
                max={max}
                disabled={disabled}
                aria-label={ariaLabel ? `${ariaLabel} maximum` : 'Maximum'}
              />
            </div>
          </>
        ) : (
          <div
            className="dls-slider__thumb"
            style={{ left: `${toPercent(singleVal, min, max)}%` }}
          >
            <SliderItem
              value={singleVal}
              min={min}
              max={max}
              disabled={disabled}
              aria-label={ariaLabel ?? 'Value'}
            />
          </div>
        )}
      </div>
    );
  },
);

Slider.displayName = 'Slider';
