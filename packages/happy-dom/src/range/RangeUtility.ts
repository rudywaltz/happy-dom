import INode from '../nodes/node/INode';
import NodeUtility from '../nodes/node/NodeUtility';

type BoundaryPoint = { node: INode; offset: number };

/**
 * Range utility.
 */
export default class RangeUtility {
	/**
	 * Compares boundary points.
	 *
	 * @see https://dom.spec.whatwg.org/#concept-range-bp-after
	 * @param pointA Point A.
	 * @param pointB Point B.
	 * @returns A number, -1, 0, or 1, indicating whether the corresponding boundary-point of the Range is respectively before, equal to, or after the corresponding boundary-point of sourceRange.
	 */
	public static compareBoundaryPointsPosition(
		pointA: BoundaryPoint,
		pointB: BoundaryPoint
	): number {
		if (pointA.node === pointB.node) {
			if (pointA.offset === pointB.offset) {
				return 0;
			} else if (pointA.offset < pointB.offset) {
				return -1;
			}

			return 1;
		}

		if (NodeUtility.isFollowing(pointA.node, pointB.node)) {
			return this.compareBoundaryPointsPosition(pointB, pointA) === -1 ? 1 : -1;
		}

		if (NodeUtility.isInclusiveAncestor(pointA.node, pointB.node)) {
			let child = pointB.node;

			while (child.parentNode !== pointA.node) {
				child = child.parentNode;
			}

			const index = child.parentNode.childNodes.indexOf(child);

			if (index < pointA.offset) {
				return 1;
			}
		}

		return -1;
	}
}