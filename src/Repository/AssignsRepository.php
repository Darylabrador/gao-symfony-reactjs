<?php

namespace App\Repository;

use App\Entity\Assigns;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Assigns|null find($id, $lockMode = null, $lockVersion = null)
 * @method Assigns|null findOneBy(array $criteria, array $orderBy = null)
 * @method Assigns[]    findAll()
 * @method Assigns[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AssignsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Assigns::class);
    }

    // /**
    //  * @return Assigns[] Returns an array of Assigns objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Assigns
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
