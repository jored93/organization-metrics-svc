import { Metric } from '../entities/metric.entity';

export interface IEditMetricInput {
  id: number;
  metric: Metric;
}
